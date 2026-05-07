"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, CreditCard, Loader2, Shield, ArrowLeft } from "lucide-react";

function MockPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState<"checkout" | "processing" | "done">("checkout");

  const txRef     = searchParams.get("tx_ref") || "";
  const amount    = searchParams.get("amount") || "0";
  const currency  = searchParams.get("currency") || "RWF";
  const title     = searchParams.get("title") || "PayWave";
  const desc      = searchParams.get("description") || "";
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";
  const meta      = (() => { try { return JSON.parse(searchParams.get("meta") || "{}"); } catch { return {}; } })();

  // Build a mock transaction ID that encodes everything verify needs
  const mockTransactionId = `MOCK-|${txRef}|${amount}|${meta.user_id || ""}|${meta.type || ""}|${meta.billing_cycle || ""}`;

  function handlePay() {
    setStep("processing");
    // Simulate a 1.5s payment processing delay
    setTimeout(() => {
      setStep("done");
      // After 1.5s more, redirect back with mock params
      setTimeout(() => {
        const url = new URL(redirectUrl, window.location.origin);
        url.searchParams.set("status", "successful");
        url.searchParams.set("tx_ref", txRef);
        url.searchParams.set("transaction_id", encodeURIComponent(mockTransactionId));
        router.push(url.toString());
      }, 1500);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

        {/* Mock badge */}
        <div className="bg-amber-500 text-white text-center text-xs font-bold py-1.5 tracking-wide">
          🧪 MOCK PAYMENT — Development Mode Only
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard size={18} />
            <span className="font-bold font-syne">{title}</span>
          </div>
          {desc && <p className="text-white/70 text-xs">{desc}</p>}
        </div>

        <div className="p-6">
          {step === "checkout" && (
            <>
              {/* Amount */}
              <div className="text-center mb-6">
                <p className="text-[#64748B] text-sm mb-1">Amount to pay</p>
                <p className="text-4xl font-extrabold text-[#0F172A] font-syne">
                  {parseInt(amount).toLocaleString()}
                  <span className="text-xl text-[#64748B] ml-1">{currency}</span>
                </p>
              </div>

              {/* Fake payment methods */}
              <div className="space-y-2 mb-6">
                {[
                  { label: "MTN MoMo", sub: "078XXXXXXX", active: true },
                  { label: "Airtel Money", sub: "073XXXXXXX", active: false },
                  { label: "Visa / Mastercard", sub: "**** **** **** 4242", active: false },
                ].map((m) => (
                  <div
                    key={m.label}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                      m.active ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#F1F5F9] bg-[#F8FAFC]"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${m.active ? "border-[#7C3AED]" : "border-[#CBD5E1]"}`}>
                      {m.active && <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />}
                    </div>
                    <div>
                      <p className="text-[#0F172A] text-sm font-semibold">{m.label}</p>
                      <p className="text-[#94A3B8] text-xs">{m.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePay}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] text-white font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(124,58,237,0.4)]"
              >
                <Shield size={16} />
                Confirm Payment — {parseInt(amount).toLocaleString()} {currency}
              </button>

              <button
                onClick={() => router.back()}
                className="w-full mt-2 py-2.5 rounded-xl text-[#64748B] text-sm font-medium hover:text-[#0F172A] flex items-center justify-center gap-1 transition-colors"
              >
                <ArrowLeft size={14} /> Cancel
              </button>

              <p className="text-center text-[10px] text-[#94A3B8] mt-3">
                This is a mock checkout. No real money is charged.
              </p>
            </>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-[#7C3AED] animate-spin mx-auto mb-4" />
              <p className="font-bold text-[#0F172A] font-syne mb-1">Processing Payment</p>
              <p className="text-[#64748B] text-sm">Please wait…</p>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="font-bold text-[#0F172A] font-syne mb-1">Payment Successful!</p>
              <p className="text-[#64748B] text-sm">Redirecting you back…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MockPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
      </div>
    }>
      <MockPaymentContent />
    </Suspense>
  );
}
