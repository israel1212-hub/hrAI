import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
import { createAdminClient } from "../../../../../supabase/server-admin";
import { generateTxRef } from "@/lib/flutterwave";
import { checkAccess } from "@/lib/wallet";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, recipientEmail, description } = await request.json();
    if (!amount || typeof amount !== "number" || amount <= 0)
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    if (!recipientEmail)
      return NextResponse.json({ error: "Recipient email is required" }, { status: 400 });
    if (recipientEmail === user.email)
      return NextResponse.json({ error: "Cannot send money to yourself" }, { status: 400 });

    const admin = createAdminClient();

    const { data: senderProfile } = await admin.from("users").select("plan, full_name").eq("user_id", user.id).single();
    const { data: senderWallet } = await admin.from("wallets").select("balance, is_frozen").eq("user_id", user.id).single();

    if (!senderWallet || senderWallet.is_frozen)
      return NextResponse.json({ error: "Wallet is frozen or not found" }, { status: 403 });
    if (senderWallet.balance < amount)
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });

    const plan = senderProfile?.plan || "free";
    const access = checkAccess(plan as "free" | "premium", "send", amount, senderWallet.balance);
    if (!access.allowed)
      return NextResponse.json({ error: access.reason, upgradeRequired: access.upgradeRequired }, { status: 403 });

    const { data: recipientProfile } = await admin.from("users").select("user_id, full_name").eq("email", recipientEmail).single();
    if (!recipientProfile)
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });

    const txRef = generateTxRef("SEND");

    const { error: deductError } = await admin
      .from("wallets")
      .update({ balance: senderWallet.balance - amount, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);
    if (deductError) return NextResponse.json({ error: "Transfer failed" }, { status: 500 });

    const { data: recipientWallet } = await admin.from("wallets").select("balance").eq("user_id", recipientProfile.user_id).single();
    await admin.from("wallets").update({ balance: (recipientWallet?.balance || 0) + amount, updated_at: new Date().toISOString() }).eq("user_id", recipientProfile.user_id);

    await admin.from("transactions").insert([
      { user_id: user.id, type: "send", amount, currency: "RWF", status: "success", reference: txRef, description: description || `Sent to ${recipientEmail}`, recipient_id: recipientProfile.user_id, payment_provider: "internal" },
      { user_id: recipientProfile.user_id, type: "receive", amount, currency: "RWF", status: "success", reference: generateTxRef("RCV"), description: description || `Received from ${user.email}`, recipient_id: recipientProfile.user_id, payment_provider: "internal" },
    ]);

    return NextResponse.json({ success: true, txRef, message: `Successfully sent ${amount.toLocaleString()} RWF to ${recipientEmail}` });
  } catch (err: any) {
    console.error("[wallet/send] Error:", err.message);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
