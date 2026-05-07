// Flutterwave webhook handler
// Set webhook URL in Flutterwave dashboard: https://your-domain.com/api/flutterwave/webhook
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../../../../supabase/server-admin";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("verif-hash");

  // Verify webhook signature
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
  if (!secretHash || signature !== secretHash) {
    console.error("Invalid Flutterwave webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only handle successful charge events
  if (event.event !== "charge.completed") {
    return NextResponse.json({ received: true });
  }

  const data = event.data;
  if (data.status !== "successful") {
    return NextResponse.json({ received: true });
  }

  // Verify with Flutterwave API (never trust webhook alone)
  const verification = await verifyFlutterwaveTransaction(String(data.id));
  if (
    verification.status !== "success" ||
    verification.data.status !== "successful"
  ) {
    return NextResponse.json({ received: true });
  }

  const supabase = createAdminClient();
  const txRef = verification.data.tx_ref;
  const meta = verification.data.meta || {};
  const userId = meta.user_id;
  const paymentType = meta.type;

  // Check if already processed (idempotency)
  const { data: existingTx } = await supabase
    .from("transactions")
    .select("status")
    .eq("reference", txRef)
    .single();

  if (existingTx?.status === "success") {
    return NextResponse.json({ received: true, message: "Already processed" });
  }

  // Update transaction
  await supabase
    .from("transactions")
    .update({
      status: "success",
      provider_reference: verification.data.flw_ref,
      updated_at: new Date().toISOString(),
    })
    .eq("reference", txRef);

  if (paymentType === "deposit" && userId) {
    const { data: wallet } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", userId)
      .single();

    await supabase
      .from("wallets")
      .update({
        balance: (wallet?.balance || 0) + verification.data.amount,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  if (paymentType === "subscription" && userId) {
    const billingCycle = meta.billing_cycle as "monthly" | "yearly";
    const expiresAt = new Date();
    if (billingCycle === "yearly") {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    await supabase
      .from("users")
      .update({
        plan: "premium",
        plan_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    await supabase
      .from("subscriptions")
      .update({ status: "active", started_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("status", "pending");
  }

  return NextResponse.json({ received: true });
}
