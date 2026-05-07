"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Plus,
  Minus,
  Crown,
  Lock,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet,
  RefreshCw,
} from "lucide-react";
import { FREE_PLAN_LIMITS, SUBSCRIPTION_PRICES } from "@/lib/flutterwave";
import SendMoneyModal from "./SendMoneyModal";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import UpgradeModal from "./UpgradeModal";

interface Transaction {
  id: string;
  type: "deposit" | "send" | "receive" | "withdraw" | "subscription";
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed";
  description: string | null;
  created_at: string;
  reference: string;
}

interface WalletDashboardProps {
  wallet: { balance: number; currency: string; isFrozen: boolean };
  userProfile: {
    plan: "free" | "premium";
    planExpiresAt: string | null;
    fullName: string;
    isVerified: boolean;
    email: string;
  };
  transactions: Transaction[];
}

function formatRWF(amount: number) {
  return new Intl.NumberFormat("en-RW", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function txIcon(type: Transaction["type"]) {
  switch (type) {
    case "deposit": return <ArrowDownLeft size={14} className="text-green-600" />;
    case "receive": return <ArrowDownLeft size={14} className="text-green-600" />;
    case "send": return <Send size={14} className="text-[#7C3AED]" />;
    case "withdraw": return <ArrowUpRight size={14} className="text-orange-500" />;
    case "subscription": return <Crown size={14} className="text-yellow-500" />;
  }
}

function txColor(type: Transaction["type"]) {
  if (type === "deposit" || type === "receive") return "text-green-600";
  return "text-[#0F172A]";
}

function txSign(type: Transaction["type"]) {
  if (type === "deposit" || type === "receive") return "+";
  return "-";
}

export default function WalletDashboard({ wallet, userProfile, transactions }: WalletDashboardProps) {
  const [showSend, setShowSend] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState("");

  const isPremium = userProfile.plan === "premium";

  function triggerUpgrade(reason: string) {
    setUpgradeReason(reason);
    setShowUpgrade(true);
  }

  const balancePercent = isPremium
    ? null
    : Math.min(100, (wallet.balance / FREE_PLAN_LIMITS.maxBalance) * 100);

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* ── Balance Card ─────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#4F6EF7] rounded-2xl p-6 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-white/70" />
              <span className="text-white/70 text-xs font-medium">Total Balance</span>
            </div>
            {isPremium ? (
              <div className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2.5 py-1">
                <Crown size={11} className="text-yellow-300" />
                <span className="text-yellow-300 text-[10px] font-bold">PREMIUM</span>
              </div>
            ) : (
              <button
                onClick={() => triggerUpgrade("Upgrade to remove all limits")}
                className="flex items-center gap-1 bg-white/10 border border-white/20 rounded-full px-2.5 py-1 hover:bg-white/20 transition-colors"
              >
                <Lock size={10} className="text-white/70" />
                <span className="text-white/70 text-[10px] font-semibold">FREE PLAN</span>
              </button>
            )}
          </div>

          <div className="mt-3 mb-4">
            <span className="text-4xl font-extrabold font-syne tracking-tight">
              {formatRWF(wallet.balance)}
            </span>
            <span className="text-white/60 text-sm ml-2">RWF</span>
          </div>

          {/* Free plan balance bar */}
          {!isPremium && (
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-white/60 mb-1">
                <span>Balance limit</span>
                <span>{formatRWF(wallet.balance)} / {formatRWF(FREE_PLAN_LIMITS.maxBalance)} RWF</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/70 rounded-full transition-all"
                  // Dynamic width for balance progress bar
                  style={{ width: `${balancePercent}%` }} // eslint-disable-line react/forbid-component-props
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setShowDeposit(true)}
              className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl p-3 transition-colors"
            >
              <Plus size={18} />
              <span className="text-[11px] font-semibold">Deposit</span>
            </button>
            <button
              onClick={() => setShowSend(true)}
              className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl p-3 transition-colors"
            >
              <Send size={18} />
              <span className="text-[11px] font-semibold">Send</span>
            </button>
            <button
              onClick={() => setShowWithdraw(true)}
              className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-xl p-3 transition-colors"
            >
              <Minus size={18} />
              <span className="text-[11px] font-semibold">Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Free Plan Limits Banner ───────────────────────────────────────── */}
      {!isPremium && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Lock size={13} className="text-amber-600" />
                <span className="text-amber-800 text-xs font-bold">Free Plan Limits</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { label: "Max Send/day", value: `${formatRWF(FREE_PLAN_LIMITS.maxSendPerDay)} RWF` },
                  { label: "Max Withdraw", value: `${formatRWF(FREE_PLAN_LIMITS.maxWithdraw)} RWF` },
                  { label: "Max Balance", value: `${formatRWF(FREE_PLAN_LIMITS.maxBalance)} RWF` },
                ].map((l) => (
                  <div key={l.label}>
                    <p className="text-amber-900 font-bold text-xs">{l.value}</p>
                    <p className="text-amber-600 text-[10px]">{l.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => triggerUpgrade("Remove all limits with Premium")}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-[#7C3AED] text-white rounded-lg text-[11px] font-bold hover:bg-[#6D28D9] transition-colors"
            >
              <Crown size={11} />
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* ── Premium expiry notice ─────────────────────────────────────────── */}
      {isPremium && userProfile.planExpiresAt && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-center gap-2">
          <Crown size={14} className="text-[#7C3AED]" />
          <span className="text-[#7C3AED] text-xs font-medium">
            Premium active until{" "}
            <strong>{new Date(userProfile.planExpiresAt).toLocaleDateString("en-RW", { day: "numeric", month: "long", year: "numeric" })}</strong>
          </span>
        </div>
      )}

      {/* ── Quick Stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total In",
            value: formatRWF(
              transactions
                .filter((t) => (t.type === "deposit" || t.type === "receive") && t.status === "success")
                .reduce((s, t) => s + t.amount, 0)
            ),
            icon: <ArrowDownLeft size={14} className="text-green-600" />,
            bg: "bg-green-50",
          },
          {
            label: "Total Out",
            value: formatRWF(
              transactions
                .filter((t) => (t.type === "send" || t.type === "withdraw") && t.status === "success")
                .reduce((s, t) => s + t.amount, 0)
            ),
            icon: <ArrowUpRight size={14} className="text-orange-500" />,
            bg: "bg-orange-50",
          },
          {
            label: "Transactions",
            value: String(transactions.length),
            icon: <TrendingUp size={14} className="text-[#7C3AED]" />,
            bg: "bg-purple-50",
          },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-3`}>
            <div className="flex items-center gap-1.5 mb-1">{s.icon}<span className="text-[10px] text-[#64748B]">{s.label}</span></div>
            <p className="text-[#0F172A] font-bold text-sm font-syne">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Recent Transactions ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F8FAFC]">
          <span className="text-sm font-bold text-[#0F172A] font-syne">Recent Transactions</span>
          <button aria-label="Refresh transactions" className="text-[#94A3B8] hover:text-[#7C3AED] transition-colors">
            <RefreshCw size={13} />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-3">
              <Wallet size={20} className="text-[#7C3AED]" />
            </div>
            <p className="text-[#0F172A] font-semibold text-sm mb-1">No transactions yet</p>
            <p className="text-[#94A3B8] text-xs">Deposit money to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F8FAFC]">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8FAFC] flex items-center justify-center shrink-0">
                    {txIcon(tx.type)}
                  </div>
                  <div>
                    <p className="text-[#0F172A] text-xs font-semibold capitalize">
                      {tx.type === "receive" ? "Received" : tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </p>
                    <p className="text-[#94A3B8] text-[10px] truncate max-w-[160px]">
                      {tx.description || tx.reference}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${txColor(tx.type)}`}>
                    {txSign(tx.type)}{formatRWF(tx.amount)} RWF
                  </p>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
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

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      {showSend && (
        <SendMoneyModal
          plan={userProfile.plan}
          onClose={() => setShowSend(false)}
          onUpgrade={(reason) => { setShowSend(false); triggerUpgrade(reason); }}
        />
      )}
      {showDeposit && (
        <DepositModal
          plan={userProfile.plan}
          currentBalance={wallet.balance}
          onClose={() => setShowDeposit(false)}
          onUpgrade={(reason) => { setShowDeposit(false); triggerUpgrade(reason); }}
        />
      )}
      {showWithdraw && (
        <WithdrawModal
          plan={userProfile.plan}
          balance={wallet.balance}
          onClose={() => setShowWithdraw(false)}
          onUpgrade={(reason) => { setShowWithdraw(false); triggerUpgrade(reason); }}
        />
      )}
      {showUpgrade && (
        <UpgradeModal
          reason={upgradeReason}
          onClose={() => setShowUpgrade(false)}
        />
      )}
    </div>
  );
}
