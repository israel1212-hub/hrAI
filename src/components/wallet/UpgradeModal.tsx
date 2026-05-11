"use client";

import { useState } from "react";
import { X, Crown, Check, Loader2, Zap, Infinity, Shield } from "lucide-react";
import { SUBSCRIPTION_PRICES } from "@/lib/flutterwave";

interface Props {
  reason?: string;
  onClose: () => void;
}

const PREMIUM_FEATURES = [
  { icon: <Infinity size={14} />, text: "Unlimited transfers" },
  { icon: <Infinity size={14} />, text: "Unlimited withdrawals" },
  { icon: <Zap size={14} />, text: "High balance limit" },
  { icon: <Shield size={14} />, text: "Priority processing" },
  { icon: <Check size={14} />, text: "No daily limits" },
];

export default function UpgradeModal({ reason, onClose }: Props) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const price = SUBSCRIPTION_PRICES[billing];
  const yearlySavings = SUBSCRIPTION_PRICES.monthly * 12 - SUBSCRIPTION_PRICES.yearly;

  async function handleUpgrade() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billingCycle: billing }),
      });
      const data = await res.json();
      if (res.ok && data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        setError(data.error || "Failed to initiate payment");
      }
    } catch (err: any) {
      setError(err.message || "Request failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
          <button
            onClick={onClose}
            aria-label="Close upgrade modal"
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={20} className="text-yellow-300" />
              <span className="font-bold text-lg font-jakarta">Upgrade to Premium</span>
            </div>
            {reason && (
              <p className="text-white/80 text-sm">{reason}</p>
            )}
          </div>
        </div>

        <div className="p-5">
          {/* Billing toggle */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-xl p-1 mb-5">
            <button
              onClick={() => setBilling("monthly")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                billing === "monthly"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                billing === "yearly"
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                SAVE
              </span>
            </button>
          </div>

          {/* Price */}
          <div className="text-center mb-5">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-extrabold text-[#0F172A] font-jakarta">
                {price.toLocaleString()}
              </span>
              <span className="text-[#64748B] text-sm">RWF/{billing === "monthly" ? "mo" : "yr"}</span>
            </div>
            {billing === "yearly" && (
              <p className="text-green-600 text-xs font-semibold mt-1">
                Save {yearlySavings.toLocaleString()} RWF vs monthly
              </p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-2.5 mb-5">
            {PREMIUM_FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#F3F0FF] flex items-center justify-center text-[#7C3AED] shrink-0">
                  {f.icon}
                </div>
                <span className="text-[#0F172A] text-sm">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Free vs Premium comparison */}
          <div className="bg-[#F8FAFC] rounded-xl p-3 mb-5">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-bold text-[#64748B] mb-2">Free Plan</p>
                <p className="text-[#94A3B8]">Send: 5,000 RWF/day</p>
                <p className="text-[#94A3B8]">Withdraw: 10,000 RWF</p>
                <p className="text-[#94A3B8]">Balance: 500,000 RWF</p>
              </div>
              <div>
                <p className="font-bold text-[#7C3AED] mb-2 flex items-center gap-1">
                  <Crown size={11} /> Premium
                </p>
                <p className="text-[#0F172A] font-semibold">Unlimited</p>
                <p className="text-[#0F172A] font-semibold">Unlimited</p>
                <p className="text-[#0F172A] font-semibold">Unlimited</p>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl p-3 mb-4">{error}</p>
          )}

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(124,58,237,0.4)]"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Crown size={16} />}
            {loading ? "Redirecting to payment…" : `Upgrade Now — ${price.toLocaleString()} RWF`}
          </button>

          <p className="text-center text-[10px] text-[#94A3B8] mt-3">
            Secure payment via Flutterwave · MTN MoMo · Airtel · Card
          </p>
        </div>
      </div>
    </div>
  );
}
