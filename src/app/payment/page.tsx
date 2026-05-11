"use client";

import { useState } from "react";
import {
  Crown, Check, Lock, Loader2,
  Zap, Shield, ArrowLeft, Infinity,
  CreditCard, Smartphone,
} from "lucide-react";
import AppShell from "@/components/app-shell";
import Link from "next/link";

export const dynamic = "force-dynamic";

const FREE_FEATURES = [
  "View wallet balance",
  "Receive money",
  "Send up to 5,000 RWF/day",
  "Deposit up to 10,000 RWF",
  "Max balance: 500,000 RWF",
];

const PREMIUM_FEATURES = [
  { icon: <Infinity size={14} />, text: "Unlimited transfers" },
  { icon: <Infinity size={14} />, text: "Unlimited withdrawals" },
  { icon: <Zap size={14} />,      text: "No daily limits" },
  { icon: <Shield size={14} />,   text: "Priority processing" },
  { icon: <Crown size={14} />,    text: "High balance limit" },
  { icon: <Check size={14} />,    text: "Everything in Free" },
];

// Prices shown in the UI (informational — actual charge is set in Polar)
const PRICES = { monthly: 2000, yearly: 15000 };

export default function PaymentPage() {
  const [billing, setBilling]   = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const price        = PRICES[billing];
  const yearlySaving = PRICES.monthly * 12 - PRICES.yearly;

  // Use sandbox or production product IDs based on mode
  const isSandbox = process.env.NEXT_PUBLIC_POLAR_MODE === "sandbox";
  const productId = billing === "monthly"
    ? (isSandbox
        ? process.env.NEXT_PUBLIC_POLAR_SANDBOX_MONTHLY_PRODUCT_ID
        : process.env.NEXT_PUBLIC_POLAR_MONTHLY_PRODUCT_ID)
    : (isSandbox
        ? process.env.NEXT_PUBLIC_POLAR_SANDBOX_YEARLY_PRODUCT_ID
        : process.env.NEXT_PUBLIC_POLAR_YEARLY_PRODUCT_ID);

  async function handleUpgrade() {
    setLoading(true);
    setError("");
    try {
      window.location.href = `/api/polar/checkout?products=${productId}`;
    } catch (err: any) {
      setError(err.message || "Failed to start checkout.");
      setLoading(false);
    }
  }

  const productsConfigured = !!productId;

  return (
    <AppShell>
      <div className="max-w-[820px] mx-auto w-full">

        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-[#64748B] text-xs hover:text-[#7C3AED] transition-colors mb-4"
          >
            <ArrowLeft size={13} /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-extrabold text-[#0F172A] font-jakarta">
              Upgrade to Premium
            </h1>
            {process.env.NEXT_PUBLIC_POLAR_MODE === "sandbox" && (
              <span className="hidden">
              </span>
            )}
          </div>
          <p className="text-[#64748B] text-sm mt-1">
            Remove all limits and unlock the full HireMind experience
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-xl p-1 mb-6 max-w-[280px]">
          {(["monthly", "yearly"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                billing === b
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {b.charAt(0).toUpperCase() + b.slice(1)}
              {b === "yearly" && (
                <span className="absolute -top-2.5 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  SAVE
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          {/* Free */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5F9] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#F8FAFC] flex items-center justify-center">
                <Lock size={15} className="text-[#64748B]" />
              </div>
              <span className="font-bold text-[#0F172A] font-jakarta">Free Plan</span>
            </div>
            <p className="text-3xl font-extrabold text-[#0F172A] font-jakarta mb-1">
              0 <span className="text-base text-[#64748B]">RWF</span>
            </p>
            <p className="text-[#94A3B8] text-xs mb-5">Forever free</p>
            <div className="space-y-2.5">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                  <Check size={13} className="text-green-500 shrink-0" /> {f}
                </div>
              ))}
              {["Unlimited transfers", "Unlimited withdrawals"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <Lock size={13} className="text-[#CBD5E1] shrink-0" /> {f}
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Crown size={15} className="text-yellow-300" />
                </div>
                <span className="font-bold font-jakarta">Premium Plan</span>
                <span className="ml-auto bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold font-jakarta">
                  {price.toLocaleString()}
                </span>
                <span className="text-white/60 text-sm">
                  RWF/{billing === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              {billing === "yearly" ? (
                <p className="text-yellow-300 text-xs mb-5">
                  Save {yearlySaving.toLocaleString()} RWF vs monthly
                </p>
              ) : (
                <p className="text-white/60 text-xs mb-5">Billed monthly</p>
              )}
              <div className="space-y-2.5">
                {PREMIUM_FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                    <span className="text-yellow-300 shrink-0">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Checkout box */}
        <div className="bg-white rounded-2xl p-6 border border-[#F1F5F9] shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-[#F3F0FF] flex items-center justify-center">
              {/* Polar logo mark */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#7C3AED" />
                <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-bold text-[#0F172A] font-jakarta">Pay with Polar</h3>
          </div>
          <p className="text-[#64748B] text-xs mb-5">
            Secure checkout · Merchant of Record · Tax handled automatically
          </p>

          {/* Payment method icons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <CreditCard size={13} />, label: "Visa" },
              { icon: <CreditCard size={13} />, label: "Mastercard" },
              { icon: <Smartphone size={13} />, label: "Apple Pay" },
              { icon: <Smartphone size={13} />, label: "Google Pay" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] font-medium"
              >
                {m.icon} {m.label}
              </div>
            ))}
          </div>

          {/* Setup notice if products not configured */}
          {!productsConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-xs font-semibold mb-2">
                ⚙️ One-time setup needed
              </p>
              <ol className="text-amber-700 text-xs space-y-1 list-decimal list-inside">
                <li>
                  Go to{" "}
                  <a
                    href="https://polar.sh/dashboard/israel1212-hubs-org/products"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline font-semibold"
                  >
                    Polar → Products
                  </a>{" "}
                  and create two products:
                </li>
                <li>
                  <strong>PayWave Premium Monthly</strong> — recurring monthly
                </li>
                <li>
                  <strong>PayWave Premium Yearly</strong> — recurring yearly
                </li>
                <li>
                  Copy each product ID and add to{" "}
                  <code className="bg-amber-100 px-1 rounded">.env.local</code>:
                </li>
              </ol>
              <pre className="mt-2 bg-amber-100 rounded-lg p-2 text-[10px] text-amber-900 overflow-x-auto">
{`NEXT_PUBLIC_POLAR_MONTHLY_PRODUCT_ID=your_id
NEXT_PUBLIC_POLAR_YEARLY_PRODUCT_ID=your_id`}
              </pre>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(124,58,237,0.4)]"
          >
            {loading
              ? <Loader2 size={18} className="animate-spin" />
              : <Crown size={18} />}
            {loading
              ? "Redirecting to Polar…"
              : `Upgrade Now — ${price.toLocaleString()} RWF/${billing === "monthly" ? "month" : "year"}`}
          </button>

          <p className="text-center text-[10px] text-[#94A3B8] mt-3">
            Powered by Polar · Secure · Cancel anytime
          </p>
        </div>

      </div>
    </AppShell>
  );
}
