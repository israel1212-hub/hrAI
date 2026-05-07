"use client";

import { useState } from "react";
import { X, Send, Loader2, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { FREE_PLAN_LIMITS } from "@/lib/flutterwave";

interface Props {
  plan: "free" | "premium";
  onClose: () => void;
  onUpgrade: (reason: string) => void;
}

export default function SendMoneyModal({ plan, onClose, onUpgrade }: Props) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const amountNum = parseFloat(amount) || 0;
  const isOverLimit = plan === "free" && amountNum > FREE_PLAN_LIMITS.maxSendPerDay;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isOverLimit) {
      onUpgrade(`Free plan: max send is ${FREE_PLAN_LIMITS.maxSendPerDay.toLocaleString()} RWF/day`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientEmail, amount: amountNum, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: data.message });
      } else if (data.upgradeRequired) {
        onUpgrade(data.error);
      } else {
        setResult({ success: false, message: data.error || "Transfer failed" });
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
            <div className="w-8 h-8 rounded-xl bg-[#F3F0FF] flex items-center justify-center">
              <Send size={15} className="text-[#7C3AED]" />
            </div>
            <span className="font-bold text-[#0F172A] font-syne">Send Money</span>
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
                  <p className="font-bold text-[#0F172A] mb-1">Transfer Successful!</p>
                  <p className="text-[#64748B] text-sm">{result.message}</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors"
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="font-bold text-[#0F172A] mb-1">Transfer Failed</p>
                  <p className="text-[#64748B] text-sm">{result.message}</p>
                  <button
                    onClick={() => setResult(null)}
                    className="mt-4 px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Free plan limit notice */}
              {plan === "free" && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Lock size={13} className="text-amber-600 shrink-0" />
                  <p className="text-amber-700 text-xs">
                    Free plan: max <strong>{FREE_PLAN_LIMITS.maxSendPerDay.toLocaleString()} RWF</strong> per day.{" "}
                    <button type="button" onClick={() => onUpgrade("Unlimited transfers with Premium")} className="underline font-semibold">Upgrade</button>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Recipient Email</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Amount (RWF)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  min="100"
                  required
                  className={`w-full px-4 py-3 rounded-xl border bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:ring-2 transition-colors ${
                    isOverLimit
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-[#E2E8F0] focus:border-[#7C3AED] focus:ring-[#7C3AED]/10"
                  }`}
                />
                {isOverLimit && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <Lock size={10} />
                    Exceeds free plan limit.{" "}
                    <button type="button" onClick={() => onUpgrade("Send unlimited amounts with Premium")} className="underline">Upgrade to Premium</button>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Note (optional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this for?"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isOverLimit}
                className="w-full py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {loading ? "Sending…" : "Send Money"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
