import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import AppShell from "@/components/app-shell";
import {
  Wallet,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  Crown,
  Lock,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { enforceSubscriptionExpiry } from "@/lib/wallet";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/sign-in");

  // Enforce subscription expiry
  await enforceSubscriptionExpiry(user.id);

  // Fetch wallet
  const { data: wallet } = await supabase
    .from("wallets")
    .select("balance, currency")
    .eq("user_id", user.id)
    .single();

  // Fetch profile
  const { data: profile } = await supabase
    .from("users")
    .select("plan, plan_expires_at, full_name")
    .eq("user_id", user.id)
    .single();

  // Fetch recent transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: false })
    .limit(5);

  const balance = wallet?.balance || 0;
  const plan = profile?.plan || "free";
  const isPremium = plan === "premium";
  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";

  const totalIn = (transactions || [])
    .filter((t) => (t.type === "deposit" || t.type === "receive") && t.status === "success")
    .reduce((s: number, t: any) => s + t.amount, 0);

  const totalOut = (transactions || [])
    .filter((t) => (t.type === "send" || t.type === "withdraw") && t.status === "success")
    .reduce((s: number, t: any) => s + t.amount, 0);

  function formatRWF(n: number) {
    return new Intl.NumberFormat("en-RW", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  }

  // Right panel
  const rightPanel = (
    <>
      {/* Profile card */}
      <div className="bg-white rounded-2xl p-4 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#0F172A]">Account</span>
          <ArrowUpRight size={13} className="text-[#94A3B8]" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] flex items-center justify-center text-white font-bold text-sm">
            {displayName[0].toUpperCase()}
          </div>
          <div>
            <p className="text-[#0F172A] font-semibold text-xs truncate max-w-[130px]">{displayName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              {isPremium ? (
                <span className="flex items-center gap-0.5 text-[9px] font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                  <Crown size={8} /> PREMIUM
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-[9px] font-semibold text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded-full">
                  <Lock size={8} /> FREE
                </span>
              )}
            </div>
          </div>
        </div>
        {!isPremium && (
          <Link
            href="/payment"
            className="flex items-center justify-center gap-1 w-full py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] text-white text-[11px] font-bold hover:opacity-90 transition-opacity"
          >
            <Crown size={11} /> Upgrade to Premium
          </Link>
        )}
        {isPremium && profile?.plan_expires_at && (
          <p className="text-[#94A3B8] text-[10px]">
            Expires {new Date(profile.plan_expires_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] rounded-2xl p-4 text-white">
        <div className="flex items-center gap-1.5 mb-2">
          <Wallet size={13} className="text-white/70" />
          <span className="text-white/70 text-[10px]">Wallet Balance</span>
        </div>
        <p className="text-2xl font-extrabold font-syne">{formatRWF(balance)}</p>
        <p className="text-white/60 text-[10px]">RWF</p>
        <Link
          href="/wallet"
          className="mt-3 flex items-center justify-center gap-1 w-full py-2 rounded-xl bg-white/20 text-white text-[11px] font-semibold hover:bg-white/30 transition-colors"
        >
          Open Wallet <ArrowUpRight size={11} />
        </Link>
      </div>
    </>
  );

  return (
    <AppShell userEmail={user.email} rightPanel={rightPanel}>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-syne">Overview</span>
          <span className="text-[9px] sm:text-[10px] text-[#94A3B8] bg-[#F8FAFC] px-2 py-0.5 sm:py-1 rounded-lg border border-[#F1F5F9]">This month</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {[
            { label: "Balance", value: `${formatRWF(balance)} RWF`, color: "text-[#7C3AED]" },
            { label: "Transactions", value: String((transactions || []).length), color: "text-[#0F172A]" },
            { label: "Total In", value: `${formatRWF(totalIn)} RWF`, color: "text-green-600" },
            { label: "Total Out", value: `${formatRWF(totalOut)} RWF`, color: "text-orange-500" },
          ].map((s) => (
            <div key={s.label}>
              <p className={`text-lg sm:text-2xl font-extrabold font-syne ${s.color}`}>{s.value}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-syne">Quick Actions</span>
          <ArrowUpRight size={12} className="sm:size-[14px] text-[#94A3B8]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <Link
            href="/wallet"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] text-white hover:opacity-90 transition-opacity group"
          >
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Wallet size={14} className="sm:size-[16px]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs sm:text-sm font-syne">My Wallet</p>
              <p className="text-blue-200 text-[10px] sm:text-xs truncate">Send, receive & withdraw</p>
            </div>
            <ArrowUpRight size={12} className="sm:size-[14px] shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/payment"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#0F172A] hover:border-[#7C3AED]/30 transition-colors group"
          >
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
              <Crown size={14} className="sm:size-[16px] text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs sm:text-sm font-syne">
                {isPremium ? "Premium Active" : "Upgrade Plan"}
              </p>
              <p className="text-[#94A3B8] text-[10px] sm:text-xs truncate">
                {isPremium ? "Unlimited access" : "Remove all limits"}
              </p>
            </div>
            <ArrowUpRight size={12} className="sm:size-[14px] shrink-0 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Recent Transactions ───────────────────────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-syne">Recent Transactions</span>
          <Link href="/wallet" className="text-[10px] text-[#7C3AED] font-semibold hover:underline">View all</Link>
        </div>
        {(transactions || []).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-2 sm:mb-3">
              <Wallet size={16} className="sm:size-[20px] text-[#7C3AED]" />
            </div>
            <p className="text-[#0F172A] font-semibold text-xs sm:text-sm mb-1">No transactions yet</p>
            <p className="text-[#94A3B8] text-[10px] sm:text-xs mb-3 sm:mb-4">Deposit money to get started</p>
            <Link
              href="/wallet"
              className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#7C3AED] text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-[#6D28D9] transition-colors"
            >
              Open Wallet <ArrowUpRight size={10} className="sm:size-[12px]" />
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            {(transactions || []).map((tx: any) => (
              <div key={tx.id} className="flex items-center justify-between py-2.5 border-b border-[#F8FAFC] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                    {(tx.type === "deposit" || tx.type === "receive") && <ArrowDownLeft size={13} className="text-green-600" />}
                    {(tx.type === "send" || tx.type === "withdraw") && <Send size={13} className="text-[#7C3AED]" />}
                    {tx.type === "subscription" && <Crown size={13} className="text-yellow-500" />}
                  </div>
                  <div>
                    <p className="text-[#0F172A] text-xs font-semibold capitalize">{tx.type}</p>
                    <p className="text-[#94A3B8] text-[10px] truncate max-w-[140px]">{tx.description || tx.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${(tx.type === "deposit" || tx.type === "receive") ? "text-green-600" : "text-[#0F172A]"}`}>
                    {(tx.type === "deposit" || tx.type === "receive") ? "+" : "-"}{formatRWF(tx.amount)} RWF
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    {tx.status === "success" && <CheckCircle2 size={9} className="text-green-500" />}
                    {tx.status === "pending" && <Clock size={9} className="text-amber-500" />}
                    {tx.status === "failed" && <XCircle size={9} className="text-red-500" />}
                    <span className="text-[9px] text-[#94A3B8] capitalize">{tx.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </AppShell>
  );
}
