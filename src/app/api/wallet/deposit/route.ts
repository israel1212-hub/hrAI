import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
import { createAdminClient } from "../../../../../supabase/server-admin";
import { paypackCashin, formatPhone, detectNetwork, isPaypackConfigured } from "@/lib/paypack";
import { generateTxRef } from "@/lib/flutterwave";
import { checkAccess } from "@/lib/wallet";

// POST /api/wallet/deposit
// Triggers a real USSD push to the user's phone via Paypack.
// Returns { ref, status } — frontend polls /api/wallet/deposit/status?ref=...
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, phone } = await request.json();

    if (!amount || typeof amount !== "number" || amount <= 0)
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    if (!phone || String(phone).trim().length < 9)
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });

    const admin = createAdminClient();

    const { data: profile } = await admin.from("users").select("plan, full_name").eq("user_id", user.id).single();
    const { data: wallet }  = await admin.from("wallets").select("balance").eq("user_id", user.id).single();

    const plan           = profile?.plan || "free";
    const currentBalance = wallet?.balance || 0;

    // Check free plan limits
    const access = checkAccess(plan as "free" | "premium", "deposit", amount, currentBalance);
    if (!access.allowed)
      return NextResponse.json({ error: access.reason, upgradeRequired: access.upgradeRequired }, { status: 403 });

    const formattedPhone = formatPhone(String(phone));
    const network        = detectNetwork(formattedPhone);
    const txRef          = generateTxRef("DEP");

    // Check Paypack is configured
    if (!isPaypackConfigured()) {
      return NextResponse.json({
        error: "Mobile money is not configured yet. Add PAYPACK_CLIENT_ID and PAYPACK_CLIENT_SECRET to .env.local after signing up at https://paypack.rw",
        setupRequired: true,
      }, { status: 503 });
    }

    // Trigger real USSD push — user gets prompt on their phone
    const cashin = await paypackCashin(formattedPhone, amount);

    // Save pending transaction with Paypack ref
    await admin.from("transactions").insert({
      user_id:          user.id,
      type:             "deposit",
      amount,
      currency:         "RWF",
      status:           "pending",
      reference:        txRef,
      provider_reference: cashin.ref,
      description:      `MoMo deposit ${amount.toLocaleString()} RWF from ${formattedPhone}`,
      payment_provider: network === "AIRTEL" ? "airtel" : "mtn",
      metadata:         { phone: formattedPhone, network, paypack_ref: cashin.ref },
    });

    return NextResponse.json({
      success: true,
      ref:     cashin.ref,
      txRef,
      status:  cashin.status,
      phone:   formattedPhone,
      network,
      message: `USSD prompt sent to ${formattedPhone}. Enter your ${network} MoMo PIN to confirm.`,
    });

  } catch (err: any) {
    console.error("[wallet/deposit] Error:", err.message);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
