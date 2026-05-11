"use client";

import { useState } from "react";
import { X, Minus, Loader2, CheckCircle, AlertCircle, Lock, Smartphone } from "lucide-react";
import { FREE_PLAN_LIMITS } from "@/lib/flutterwave";
import { detectNetwork } from "@/lib/phone";

interface Props {
  plan: "free" | "premium";
  balance: number;
  onClose: () => void;
  onUpgrade: (reason: string) => void;
}

export default function WithdrawModal({ plan, balance, onClose, onUpgrade }: Props) {
  const [amount, setAmount]   = useState("");
  const [phone, setPhone]     = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<{ success: boolean; message: string } | null>(null);

  const amountNum           = parseFloat(amount) || 0;
  const isOverLimit         = plan === "free" && amountNum > FREE_PLAN_LIMITS.maxWithdraw;
  const insufficientBalance = amountNum > balance;
  const network             = phone.length >= 3 ? detectNetwork(phone) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isOverLimit) { onUpgrade(`Free plan: max withdrawal is ${FREE_PLAN_LIMITS.maxWithdraw.toLocaleString()} RWF`); return; }
    if (insufficientBalance) { setResult({ success: false, message: "Insufficient balance" }); return; }

    setLoading(true);
    try {
      const res  = await fetch("/api/wallet/withdraw", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ amount: amountNum, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: data.message });
      } else if (data.upgradeRequired) {
        onUpgrade(data.error);
      } else {
        setResult({ success: false, message: data.error || "Withdrawal failed" });
      }
    } catch (err: any) {
      setResult({ success: false, message: err.message || "Request failed. Check your connection." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
              <Minus size={15} className="text-orange-600" />
            </div>
            <span className="font-bold text-[#0F172A] font-jakarta">Withdraw to MoMo</span>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {result ? (
            <div className="text-center py-4">
              {result.success ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-[#0F172A] mb-1">Withdrawal Sent!</p>
                  <p className="text-[#64748B] text-sm mb-2">{result.message}</p>
                  <p className="text-[#94A3B8] text-xs">Money will arrive in your MoMo wallet within seconds.</p>
                  <button onClick={onClose} className="mt-4 px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors">
                    Done
                  </button>
                </>
              ) : (
                <>
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="font-bold text-[#0F172A] mb-1">Withdrawal Failed</p>
                  <p className="text-[#64748B] text-sm">{result.message}</p>
                  <button onClick={() => setResult(null)} className="mt-4 px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors">
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Free plan notice */}
              {plan === "free" && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Lock size={13} className="text-amber-600 shrink-0" />
                  <p className="text-amber-700 text-xs">
                    Free plan: max <strong>{FREE_PLAN_LIMITS.maxWithdraw.toLocaleString()} RWF</strong> per withdrawal.{" "}
                    <button type="button" onClick={() => onUpgrade("Withdraw unlimited with Premium")} className="underline font-semibold">Upgrade</button>
                  </p>
                </div>
              )}

              {/* Phone number */}
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                  Mobile Money Phone Number
                </label>
                <div className="relative">
                  <Smartphone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="078XXXXXXX or 073XXXXXXX"
                    required
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                  />
                </div>
                {network && network !== "UNKNOWN" && (
                  <div className={`mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    network === "MTN" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                  }`}>
                    ✓ {network} MoMo detected
                  </div>
                )}
                {network === "UNKNOWN" && phone.length >= 9 && (
                  <p className="text-red-500 text-[10px] mt-1">
                    Use MTN (078/079/077/076) or Airtel (073/072).
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Amount (RWF)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  min="100"
                  max={balance}
                  required
                  className={`w-full px-4 py-3 rounded-xl border bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:ring-2 transition-colors ${
                    isOverLimit || insufficientBalance
                      ? "border-red-300 focus:ring-red-100"
                      : "border-[#E2E8F0] focus:border-[#7C3AED] focus:ring-[#7C3AED]/10"
                  }`}
                />
                <p className="text-[10px] text-[#94A3B8] mt-1">Available: {balance.toLocaleString()} RWF</p>
                {isOverLimit && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <Lock size={10} /> Exceeds free plan limit.{" "}
                    <button type="button" onClick={() => onUpgrade("Withdraw unlimited with Premium")} className="underline">Upgrade</button>
                  </p>
                )}
                {insufficientBalance && !isOverLimit && (
                  <p className="text-red-500 text-xs mt-1">Insufficient balance</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || isOverLimit || insufficientBalance || !phone || network === "UNKNOWN"}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Minus size={16} />}
                {loading ? "Sending to MoMo…" : "Withdraw to MoMo"}
              </button>

              <p className="text-center text-[10px] text-[#94A3B8]">
                Money is sent directly to your MoMo wallet. No PIN needed.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
