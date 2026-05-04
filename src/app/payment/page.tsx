"use client";

import { useState } from "react";
import { QrCode, Eye } from "lucide-react";
import AppShell from "@/components/app-shell";

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("5678 •••• •••• 1267");
  const [cardHolder, setCardHolder] = useState("Cameron Williamson");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const [activeMethod, setActiveMethod] = useState<"card" | "google" | "apple" | "paypal">("card");
  const [activeCard, setActiveCard] = useState(1);
  const amount = 354;

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  const cardStyles = [
    { rotate: "rotate(2deg) translateY(-4px)", bg: "linear-gradient(135deg, rgba(30,20,60,0.9) 0%, rgba(50,30,90,0.8) 100%)", border: "1px solid rgba(255,255,255,0.12)" },
    { rotate: "rotate(-2deg) translateY(8px)", bg: "linear-gradient(135deg, #818CF8 0%, #A5B4FC 100%)", border: "none" },
    { rotate: "rotate(-6deg) translateY(20px)", bg: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)", border: "none" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[520px]">

      {/* Left — card visuals */}
      <div className="relative lg:w-[280px] shrink-0 bg-gradient-to-br from-[#1a1040] via-[#2d1b6e] to-[#0d0820] flex items-center justify-center overflow-hidden p-8">
        <div className="absolute top-6 left-6 w-32 h-32 bg-[#7C3AED] rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-6 right-6 w-40 h-40 bg-[#4F46E5] rounded-full opacity-30 blur-3xl" />

        <div className="relative w-[220px] h-[180px]">
          {cardStyles.map((style, idx) => {
            const cardNum = idx + 1;
            return (
              <button
                key={cardNum}
                type="button"
                onClick={() => setActiveCard(cardNum)}
                aria-label={`Select card ${cardNum}`}
                className={`absolute bottom-0 left-1/2 w-[210px] h-[130px] rounded-2xl transition-all duration-300 cursor-pointer ${activeCard === cardNum ? "shadow-[0_0_0_2px_#A855F7]" : ""}`}
                style={{ background: style.bg, border: style.border, transform: `translateX(-50%) ${style.rotate}` }}
              >
                <div className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-white font-bold text-xs tracking-widest">VISA</span>
                    {cardNum === 3 && (
                      <div className="flex">
                        <div className="w-5 h-5 rounded-full bg-[#F59E0B] opacity-90" />
                        <div className="w-5 h-5 rounded-full bg-[#EF4444] opacity-70 -ml-2" />
                      </div>
                    )}
                  </div>
                  <p className="text-white/60 text-[9px] tracking-[0.15em]">4455 5491 6118 6164</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#0F172A] text-lg font-bold font-syne">Payment details</h2>
          <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E8EDF5] text-[#64748B] text-xs font-medium hover:border-[#A855F7] hover:text-[#A855F7] transition-colors">
            <QrCode size={12} /> QR code
          </button>
        </div>

        {/* Quick pay */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { id: "google", label: "Google Pay", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
            { id: "apple", label: "Apple Pay", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
            { id: "paypal", label: "PayPal", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#003087"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.825l-1.314 8.32h3.87c.524 0 .968-.382 1.05-.9l.043-.22.824-5.228.053-.286c.082-.518.526-.9 1.05-.9h.662c4.298 0 7.664-1.747 8.647-6.797.41-2.1.198-3.855-.688-5.084z"/></svg> },
          ].map((m) => (
            <button key={m.id} type="button" onClick={() => setActiveMethod(m.id as typeof activeMethod)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-medium transition-all ${activeMethod === m.id ? "border-[#A855F7] bg-[#FAF5FF] text-[#7C3AED]" : "border-[#E8EDF5] text-[#475569] hover:border-[#A855F7]/40"}`}>
              {m.icon}<span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#E8EDF5]" />
          <span className="text-[#94A3B8] text-xs">Or</span>
          <div className="flex-1 h-px bg-[#E8EDF5]" />
        </div>

        {/* Card number */}
        <div className="mb-3">
          <label className="block text-[#0F172A] text-xs font-semibold mb-1">Card Number <span className="text-[#A855F7]">*</span></label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-[#FAFAFA] focus-within:border-[#A855F7] focus-within:ring-2 focus-within:ring-[#A855F7]/10 transition-all">
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
              className="flex-1 bg-transparent text-[#0F172A] text-sm font-medium tracking-widest focus:outline-none placeholder:text-[#94A3B8]"
              placeholder="•••• •••• •••• ••••" />
            <button type="button" aria-label="Toggle visibility" className="text-[#94A3B8] hover:text-[#475569]"><Eye size={14} /></button>
          </div>
        </div>

        {/* Card holder */}
        <div className="mb-3">
          <label className="block text-[#0F172A] text-xs font-semibold mb-1">Card Holder Name</label>
          <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#A855F7] bg-white text-[#0F172A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
            placeholder="Full name on card" />
        </div>

        {/* Expiry + CVV */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-[#0F172A] text-xs font-semibold mb-1">Expiry <span className="text-[#A855F7]">*</span></label>
            <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-[#FAFAFA] text-[#0F172A] text-sm focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/10 transition-all"
              placeholder="mm / yy" maxLength={7} />
          </div>
          <div className="flex-1">
            <label className="block text-[#0F172A] text-xs font-semibold mb-1">CVV <span className="text-[#A855F7]">*</span></label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-[#FAFAFA] focus-within:border-[#A855F7] focus-within:ring-2 focus-within:ring-[#A855F7]/10 transition-all">
              <input type={showCvv ? "text" : "password"} value={cvv} onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                className="flex-1 bg-transparent text-[#0F172A] text-sm focus:outline-none w-0" placeholder="xxx" maxLength={4} />
              <div className="flex shrink-0">
                <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-90" />
                <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90 -ml-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Total + pay */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#475569] text-sm font-medium">Total Amount:</span>
          <span className="text-[#A855F7] text-lg font-extrabold font-syne">${amount}</span>
        </div>
        <button type="button"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold text-sm hover:from-[#6D28D9] hover:to-[#9333EA] shadow-[0_6px_20px_rgba(124,58,237,0.4)] active:scale-[0.98] transition-all">
          Pay ${amount}
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <AppShell>
      <PaymentForm />
    </AppShell>
  );
}
