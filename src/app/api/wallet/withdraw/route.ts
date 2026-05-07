import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
import { createAdminClient } from "../../../../../supabase/server-admin";
import { paypackCashout, formatPhone, detectNetwork, isPaypackConfigured } from "@/lib/paypack";
import { generateTxRef } from "@/lib/flutterwave";
import { checkAccess } from "@/lib/wallet";

// POST /api/wallet/withdraw
// Sends money directly to user's MoMo — no PIN needed from user.
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
    const { data: wallet }  = await admin.from("wallets").select("balance, is_frozen").eq("user_id", user.id).single();

    if (!wallet || wallet.is_frozen)
      return NextResponse.json({ error: "Wallet is frozen or not found" }, { status: 403 });
    if (wallet.balance < amount)
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });

    const plan   = profile?.plan || "free";
    const access = checkAccess(plan as "free" | "premium", "withdraw", amount, wallet.balance);
    if (!access.allowed)
      return NextResponse.json({ error: access.reason, upgradeRequired: access.upgradeRequired }, { status: 403 });

    const formattedPhone = formatPhone(String(phone));
    const network        = detectNetwork(formattedPhone);
    const txRef          = generateTxRef("WDR");

    if (!isPaypackConfigured()) {
      return NextResponse.json({
        error: "Mobile money is not configured yet. Add PAYPACK_CLIENT_ID and PAYPACK_CLIENT_SECRET to .env.local after signing up at https://paypack.rw",
        setupRequired: true,
      }, { status: 503 });
    }

    // Deduct balance immediately (hold)
    await admin
      .from("wallets")
      .update({ balance: wallet.balance - amount, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

    // Send real MoMo cashout — money goes directly to phone
    let cashout;
    try {
      cashout = await paypackCashout(formattedPhone, amount);
    } catch (paypackErr: any) {
      // Refund balance if cashout fails
      await admin
        .from("wallets")
        .update({ balance: wallet.balance, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);
      throw paypackErr;
    }

    // Record transaction
    await admin.from("transactions").insert({
      user_id:            user.id,
      type:               "withdraw",
      amount,
      currency:           "RWF",
      status:             cashout.status === "successful" ? "success" : "pending",
      reference:          txRef,
      provider_reference: cashout.ref,
      description:        `Withdrawal ${amount.toLocaleString()} RWF to ${formattedPhone}`,
      payment_provider:   network === "AIRTEL" ? "airtel" : "mtn",
      metadata:           { phone: formattedPhone, network, paypack_ref: cashout.ref },
    });

    return NextResponse.json({
      success: true,
      txRef,
      ref:     cashout.ref,
      status:  cashout.status,
      message: `${amount.toLocaleString()} RWF sent to ${formattedPhone} (${network} MoMo)`,
    });

  } catch (err: any) {
    console.error("[wallet/withdraw] Error:", err.message);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
