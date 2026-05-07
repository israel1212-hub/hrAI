import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";
import { createAdminClient } from "../../../../supabase/server-admin";
import {
  initFlutterwavePayment,
  generateTxRef,
  SUBSCRIPTION_PRICES,
} from "@/lib/flutterwave";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { billingCycle } = await request.json() as { billingCycle: "monthly" | "yearly" };
    if (!billingCycle || !["monthly", "yearly"].includes(billingCycle))
      return NextResponse.json({ error: "Invalid billing cycle" }, { status: 400 });

    const admin = createAdminClient();

    const { data: profile } = await admin.from("users").select("plan, full_name").eq("user_id", user.id).single();
    // Allow re-subscribing even if already premium (handles sandbox retests)

    const amount = SUBSCRIPTION_PRICES[billingCycle];
    const txRef = generateTxRef("SUB");
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "";

    const expiresAt = new Date();
    if (billingCycle === "monthly") expiresAt.setMonth(expiresAt.getMonth() + 1);
    else expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    await admin.from("subscriptions").insert({ user_id: user.id, plan: "premium", billing_cycle: billingCycle, amount, status: "pending", payment_provider: "flutterwave", expires_at: expiresAt.toISOString() });
    await admin.from("transactions").insert({ user_id: user.id, type: "subscription", amount, currency: "RWF", status: "pending", reference: txRef, description: `Premium subscription (${billingCycle})`, payment_provider: "flutterwave", metadata: { billing_cycle: billingCycle } });

    const paymentData = await initFlutterwavePayment({
      tx_ref: txRef, amount, currency: "RWF",
      redirect_url: `${origin}/payment/callback`,
      customer: { email: user.email!, name: profile?.full_name || user.email! },
      customizations: { title: "PayWave Premium", description: `${billingCycle === "monthly" ? "Monthly" : "Yearly"} subscription — ${amount.toLocaleString()} RWF` },
      meta: { user_id: user.id, type: "subscription", billing_cycle: billingCycle },
    });

    return NextResponse.json({ paymentLink: paymentData.data.link, txRef, amount, billingCycle });
  } catch (err: any) {
    console.error("[subscribe] Error:", err.message);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
