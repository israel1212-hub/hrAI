import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
import { createAdminClient } from "../../../../../supabase/server-admin";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";

export async function POST(request: NextRequest) {
  // 1. Verify session
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { transactionId, txRef } = await request.json();

  if (!transactionId) {
    return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });
  }

  // Decode in case it was URL-encoded
  const decodedId = decodeURIComponent(String(transactionId));

  // 2. Verify with Flutterwave API
  const verification = await verifyFlutterwaveTransaction(decodedId);

  if (
    verification.status !== "success" ||
    verification.data.status !== "successful"
  ) {
    const admin = createAdminClient();
    await admin
      .from("transactions")
      .update({ status: "failed", updated_at: new Date().toISOString() })
      .eq("reference", txRef);

    return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
  }

  const admin = createAdminClient();
  const meta = verification.data.meta || {};
  const paymentType = meta.type;
  const userId = meta.user_id || user.id;

  // Update transaction status
  await admin
    .from("transactions")
    .update({
      status: "success",
      provider_reference: String(verification.data.flw_ref),
      updated_at: new Date().toISOString(),
    })
    .eq("reference", txRef || verification.data.tx_ref);

  if (paymentType === "deposit") {
    const { data: wallet } = await admin
      .from("wallets")
      .select("balance")
      .eq("user_id", userId)
      .single();

    await admin
      .from("wallets")
      .update({
        balance: (wallet?.balance || 0) + verification.data.amount,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    return NextResponse.json({ success: true, type: "deposit", amount: verification.data.amount });
  }

  if (paymentType === "subscription") {
    const billingCycle = meta.billing_cycle as "monthly" | "yearly";
    const expiresAt = new Date();
    if (billingCycle === "yearly") {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    await admin
      .from("users")
      .update({
        plan: "premium",
        plan_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    await admin
      .from("subscriptions")
      .update({ status: "active", started_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("status", "pending");

    return NextResponse.json({
      success: true,
      type: "subscription",
      plan: "premium",
      expiresAt: expiresAt.toISOString(),
    });
  }

  return NextResponse.json({ success: true });
}
