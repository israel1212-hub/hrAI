import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import AppShell from "@/components/app-shell";
import {
  Wallet, Send, ArrowUpRight, Crown, Lock,
  TrendingUp, CheckCircle2, Clock, XCircle,
  BarChart3, Users, Brain, ArrowDownRight,
} from "lucide-react";
import { enforceSubscriptionExpiry } from "@/lib/wallet";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/sign-in");

  await enforceSubscriptionExpiry(user.id);

  const { data: wallet } = await supabase.from("wallets").select("balance, currency").eq("user_id", user.id).single();
  const { data: profile } = await supabase.from("users").select("plan, plan_expires_at, full_name").eq("user_id", user.id).single();
  const { data: transactions } = await supabase.from("transactions").select("*").or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`).order("created_at", { ascending: false }).limit(5);
  const { count: sessionCount } = await supabase.from("interview_sessions").select("*", { count: "exact", head: true }).eq("user_id", user.id);

  const balance = wallet?.balance || 0;
  const plan = profile?.plan || "free";
  const isPremium = plan === "premium";
  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";

  function formatRWF(n: number) {
    return new Intl.NumberFormat("en-RW", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  }

  const totalIn = (transactions || []).filter((t: any) => (t.type === "deposit" || t.type === "receive") && t.status === "success").reduce((s: number, t: any) => s + t.amount, 0);
  const totalOut = (transactions || []).filter((t: any) => (t.type === "send" || t.type === "withdraw") && t.status === "success").reduce((s: number, t: any) => s + t.amount, 0);

  return (
    <AppShell userEmail={user.email}>
      {/* ── Header row ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-[#0F172A] text-xl font-bold font-syne">Overview</h1>
          <p className="text-[#94A3B8] text-xs mt-0.5">Your main activities data</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#F1F5F9] rounded-lg text-xs text-[#64748B] shadow-sm">
            <Clock size={12} /> Last 30 days
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#F1F5F9] rounded-lg text-xs text-[#64748B] shadow-sm">
            Daily
          </div>
        </div>
      </div>

      {/* ── Stats row (Tailark style) ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Wallet Balance",
            value: `${formatRWF(balance)} RWF`,
            badge: isPremium ? { text: "Premium", color: "bg-green-100 text-green-700" } : { text: "Free", color: "bg-[#F1F5F9] text-[#64748B]" },
            icon: <Wallet size={14} className="text-[#7C3AED]" />,
            sub: isPremium ? "Unlimited" : "Limited plan",
          },
          {
            label: "Interviews",
            value: String(sessionCount ?? 0),
            badge: { text: "+12%", color: "bg-green-100 text-green-700" },
            icon: <Brain size={14} className="text-[#2563EB]" />,
            sub: "This month",
          },
          {
            label: "Total In",
            value: `${formatRWF(totalIn)} RWF`,
            badge: { text: "+65%", color: "bg-green-100 text-green-700" },
            icon: <TrendingUp size={14} className="text-green-600" />,
            sub: "Deposits & received",
          },
          {
            label: "Total Out",
            value: `${formatRWF(totalOut)} RWF`,
            badge: { text: "-5%", color: "bg-red-100 text-red-600" },
            icon: <Send size={14} className="text-orange-500" />,
            sub: "Sent & withdrawn",
          },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-[#F1F5F9] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#64748B] text-xs">{s.label}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${s.badge.color}`}>{s.badge.text}</span>
            </div>
            <p className="text-[#0F172A] text-xl font-extrabold font-syne mb-1">{s.value}</p>
            <div className="flex items-center gap-1 text-[#94A3B8] text-[10px]">
              {s.icon} {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── Activity chart placeholder ──────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#F1F5F9] shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#0F172A] text-sm font-bold font-syne">Activity</p>
            <p className="text-[#94A3B8] text-xs">Interviews and transactions</p>
          </div>
          <ArrowUpRight size={14} className="text-[#94A3B8]" />
        </div>
        {/* Simple SVG chart */}
        <div className="h-32 flex items-end gap-1.5">
          {[20, 35, 28, 45, 38, 55, 42, 60, 48, 70, 55, 65, 72, 58, 80, 65, 75, 85, 70, 90, 78, 88, 82, 95, 85, 92, 88, 96, 90, 98].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all"
              style={{
                height: `${h}%`,
                backgroundColor: i === 29 ? "#7C3AED" : i > 20 ? "#EDE9FE" : "#F1F5F9",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {["Dec 1", "Dec 9", "Dec 17", "Dec 25", "Dec 31"].map((d) => (
            <span key={d} className="text-[#94A3B8] text-[9px]">{d}</span>
          ))}
        </div>
      </div>

      {/* ── Quick actions + Recent transactions ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-[#F1F5F9] shadow-sm p-5">
          <p className="text-[#0F172A] text-sm font-bold font-syne mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/wallet" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] text-white hover:opacity-90 transition-opacity">
              <Wallet size={20} />
              <span className="text-xs font-semibold">My Wallet</span>
            </Link>
            <Link href="/interview" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#0F172A] hover:border-[#7C3AED]/30 transition-colors">
              <Brain size={20} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold">New Interview</span>
            </Link>
            <Link href="/interview/admin" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#0F172A] hover:border-[#7C3AED]/30 transition-colors">
              <BarChart3 size={20} className="text-[#2563EB]" />
              <span className="text-xs font-semibold">Questions</span>
            </Link>
            <Link href="/payment" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#0F172A] hover:border-[#7C3AED]/30 transition-colors">
              <Crown size={20} className="text-yellow-500" />
              <span className="text-xs font-semibold">{isPremium ? "Premium ✓" : "Upgrade"}</span>
            </Link>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white rounded-xl border border-[#F1F5F9] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#0F172A] text-sm font-bold font-syne">Recent Transactions</p>
            <Link href="/wallet" className="text-[10px] text-[#7C3AED] font-semibold hover:underline">View all</Link>
          </div>
          {(transactions || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] flex items-center justify-center mb-2">
                <Wallet size={18} className="text-[#7C3AED]" />
              </div>
              <p className="text-[#0F172A] text-xs font-semibold mb-1">No transactions yet</p>
              <p className="text-[#94A3B8] text-[10px]">Deposit money to get started</p>
            </div>
          ) : (
            <div className="space-y-1">
              {(transactions || []).map((tx: any) => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-[#F8FAFC] last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                      {(tx.type === "deposit" || tx.type === "receive") && <TrendingUp size={12} className="text-green-600" />}
                      {(tx.type === "send" || tx.type === "withdraw") && <Send size={12} className="text-[#7C3AED]" />}
                      {tx.type === "subscription" && <Crown size={12} className="text-yellow-500" />}
                    </div>
                    <div>
                      <p className="text-[#0F172A] text-xs font-semibold capitalize">{tx.type}</p>
                      <p className="text-[#94A3B8] text-[9px] truncate max-w-[120px]">{tx.description || tx.reference}</p>
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
      </div>
    </AppShell>
  );
}
