import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../../../../supabase/server-admin";

// Polar webhook handler
// Set webhook URL in Polar dashboard → Settings → Webhooks
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  // If not configured yet, acknowledge without processing
  if (!webhookSecret || webhookSecret === "your_polar_webhook_secret_here") {
    console.warn("[polar/webhook] POLAR_WEBHOOK_SECRET not configured");
    return NextResponse.json({ received: true });
  }

  try {
    const { Webhooks } = await import("@polar-sh/nextjs");

    const handler = Webhooks({
      webhookSecret,

      onSubscriptionActive: async (payload) => {
        const admin = createAdminClient();
        const sub = payload.data;
        const customerEmail = sub.customer?.email;
        if (!customerEmail) return;

        const { data: user } = await admin
          .from("users").select("user_id").eq("email", customerEmail).single();
        if (!user) return;

        const expiresAt = new Date();
        const interval = (sub as any).product?.prices?.[0]?.recurringInterval;
        if (interval === "year") expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        else expiresAt.setMonth(expiresAt.getMonth() + 1);

        await admin.from("users").update({
          plan: "premium",
          plan_expires_at: expiresAt.toISOString(),
        }).eq("user_id", user.user_id);

        await admin.from("subscriptions").upsert({
          user_id: user.user_id,
          plan: "premium",
          billing_cycle: interval === "year" ? "yearly" : "monthly",
          amount: interval === "year" ? 15000 : 2000,
          status: "active",
          payment_provider: "polar",
          provider_subscription_id: sub.id,
          expires_at: expiresAt.toISOString(),
        }, { onConflict: "provider_subscription_id" });
      },

      onSubscriptionRevoked: async (payload) => {
        const admin = createAdminClient();
        const sub = payload.data;
        const customerEmail = sub.customer?.email;
        if (!customerEmail) return;

        const { data: user } = await admin
          .from("users").select("user_id").eq("email", customerEmail).single();
        if (!user) return;

        await admin.from("users").update({ plan: "free", plan_expires_at: null })
          .eq("user_id", user.user_id);
      },

      onOrderPaid: async (payload) => {
        const admin = createAdminClient();
        const order = payload.data;
        const customerEmail = order.customer?.email;
        if (!customerEmail) return;

        const { data: user } = await admin
          .from("users").select("user_id").eq("email", customerEmail).single();
        if (!user) return;

        await admin.from("transactions").insert({
          user_id: user.user_id,
          type: "subscription",
          amount: Math.round((order.netAmount ?? order.amount) / 100),
          currency: order.currency?.toUpperCase() ?? "USD",
          status: "success",
          reference: order.id,
          description: "Polar subscription payment",
          payment_provider: "polar",
          provider_reference: order.id,
        });
      },
    });

    return handler(request);
  } catch (err: any) {
    console.error("[polar/webhook] Error:", err.message);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
