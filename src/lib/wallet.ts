// Wallet business logic — server-side only
import { createClient } from "../../supabase/server";
import { createAdminClient } from "../../supabase/server-admin";
import { FREE_PLAN_LIMITS } from "./flutterwave";

export type UserPlan = "free" | "premium";

export interface WalletUser {
  id: string;
  email: string;
  full_name: string | null;
  plan: UserPlan;
  plan_expires_at: string | null;
  balance: number;
  is_verified: boolean;
}

export interface AccessCheckResult {
  allowed: boolean;
  reason?: string;
  upgradeRequired?: boolean;
}

/** Check if a user can perform an action given their plan */
export function checkAccess(
  plan: UserPlan,
  action: "send" | "withdraw" | "deposit",
  amount: number,
  currentBalance: number
): AccessCheckResult {
  if (plan === "premium") return { allowed: true };

  switch (action) {
    case "send":
      if (amount > FREE_PLAN_LIMITS.maxSendPerDay) {
        return {
          allowed: false,
          reason: `Free plan: max send is ${FREE_PLAN_LIMITS.maxSendPerDay.toLocaleString()} RWF/day`,
          upgradeRequired: true,
        };
      }
      break;
    case "withdraw":
      if (amount > FREE_PLAN_LIMITS.maxWithdraw) {
        return {
          allowed: false,
          reason: `Free plan: max withdrawal is ${FREE_PLAN_LIMITS.maxWithdraw.toLocaleString()} RWF`,
          upgradeRequired: true,
        };
      }
      break;
    case "deposit":
      if (currentBalance + amount > FREE_PLAN_LIMITS.maxBalance) {
        return {
          allowed: false,
          reason: `Free plan: max balance is ${FREE_PLAN_LIMITS.maxBalance.toLocaleString()} RWF`,
          upgradeRequired: true,
        };
      }
      if (amount > FREE_PLAN_LIMITS.maxDeposit) {
        return {
          allowed: false,
          reason: `Free plan: max deposit is ${FREE_PLAN_LIMITS.maxDeposit.toLocaleString()} RWF`,
          upgradeRequired: true,
        };
      }
      break;
  }

  return { allowed: true };
}

/** Get wallet data for the current user */
export async function getWalletData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get wallet balance
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Get user plan info
  const { data: profile } = await supabase
    .from("users")
    .select("plan, plan_expires_at, full_name, is_verified")
    .eq("user_id", user.id)
    .single();

  // Get recent transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    user,
    wallet: wallet || { balance: 0, currency: "RWF" },
    profile: profile || { plan: "free", plan_expires_at: null, full_name: null, is_verified: false },
    transactions: transactions || [],
  };
}

/** Check if subscription is expired and downgrade if needed */
export async function enforceSubscriptionExpiry(userId: string) {
  const admin = createAdminClient();

  const { data: profile } = await admin
    .from("users")
    .select("plan, plan_expires_at")
    .eq("user_id", userId)
    .single();

  if (!profile) return;

  if (
    profile.plan === "premium" &&
    profile.plan_expires_at &&
    new Date(profile.plan_expires_at) < new Date()
  ) {
    await admin
      .from("users")
      .update({ plan: "free", plan_expires_at: null })
      .eq("user_id", userId);
  }
}

/** Format RWF amount for display */
export function formatRWF(amount: number): string {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
