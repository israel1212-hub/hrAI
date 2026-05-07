import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import AppShell from "@/components/app-shell";
import WalletDashboard from "@/components/wallet/WalletDashboard";
import { enforceSubscriptionExpiry } from "@/lib/wallet";

export default async function WalletPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/sign-in");

  // Enforce subscription expiry on every wallet visit
  await enforceSubscriptionExpiry(user.id);

  // Fetch wallet data
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: profile } = await supabase
    .from("users")
    .select("plan, plan_expires_at, full_name, is_verified")
    .eq("user_id", user.id)
    .single();

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: false })
    .limit(10);

  const walletData = {
    balance: wallet?.balance || 0,
    currency: wallet?.currency || "RWF",
    isFrozen: wallet?.is_frozen || false,
  };

  const userProfile = {
    plan: (profile?.plan || "free") as "free" | "premium",
    planExpiresAt: profile?.plan_expires_at || null,
    fullName: profile?.full_name || user.email?.split("@")[0] || "User",
    isVerified: profile?.is_verified || false,
    email: user.email || "",
  };

  return (
    <AppShell userEmail={user.email}>
      <WalletDashboard
        wallet={walletData}
        userProfile={userProfile}
        transactions={transactions || []}
      />
    </AppShell>
  );
}
