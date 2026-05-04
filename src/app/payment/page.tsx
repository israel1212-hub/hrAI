"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import AppShell from "@/components/app-shell";
import Link from "next/link";

function PaymentForm() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [method, setMethod] = useState<"card" | "paypal" | "apple" | "google">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [promo, setPromo] = useState("");
  const [showPromo, setShowPromo] = useState(false);

  const monthlyPrice = 239;
  const yearlyPrice = 189;
  const price = billing === "yearly" ? yearlyPrice : monthlyPrice;
  const total = billing === "yearly" ? yearlyPrice * 12 : monthlyPrice;

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-[#F1F5F9] shadow-sm">

      {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
      <div className="lg:w-[380px] shrink-0 relative overflow-hidden flex flex-col p-8"
        style={{ background: "linear-gradient(145deg, #9333EA 0%, #C026D3 40%, #F97316 100%)" }}>

        {/* Wave lines decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {[0,1,2,3,4,5,6,7,8].map((i) => (
              <path key={i}
                d={`M-50 ${100 + i * 60} Q 100 ${60 + i * 60} 200 ${100 + i * 60} T 450 ${100 + i * 60}`}
                fill="none" stroke="white" strokeWidth="1.5" opacity={0.6 - i * 0.05}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Back */}
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors w-fit">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowLeft size={13} />
            </div>
            Upgrade your plan
          </Link>

          {/* Price */}
          <div className="mb-6">
            <p className="text-white text-4xl font-extrabold font-syne mb-1">
              ${total.toLocaleString()}.00
            </p>
            <p className="text-white/70 text-sm">
              We will bill you ${price}.00 {billing === "yearly" ? "monthly" : "monthly"} + taxes, unless you cancel.
            </p>
          </div>

          {/* Plan card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm font-syne">S</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white font-bold text-sm font-syne">Standard pro</p>
                  <p className="text-white font-bold text-sm">${price}.00</p>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">
                  Up to 5 users in HireMind AI. Great for small teams, agencies and startups.
                </p>
              </div>
            </div>
          </div>

          {/* Promo code */}
          {showPromo ? (
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/60"
              />
              <button type="button" className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-xl transition-colors">
                Apply
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowPromo(true)}
              className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold border border-white/20 transition-colors mb-6"
            >
              Add promo code
            </button>
          )}

          {/* Totals */}
          <div className="mt-auto space-y-2 pt-4 border-t border-white/20">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Subtotal</span>
              <span className="text-white font-semibold">${total.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white font-bold">Total due today</span>
              <span className="text-white font-bold">${price}.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">

        {/* Billing frequency */}
        <div className="mb-7">
          <p className="text-[#0F172A] font-bold text-sm mb-3">Billing frequency</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                billing === "monthly"
                  ? "border-[#2563EB] bg-[#EEF4FF]"
                  : "border-[#E8EDF5] hover:border-[#CBD5E1]"
              }`}
            >
              <p className="text-[#64748B] text-xs mb-1">Pay monthly</p>
              <p className="text-[#0F172A] font-bold text-sm">${monthlyPrice}/month</p>
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                billing === "yearly"
                  ? "border-[#2563EB] bg-[#EEF4FF]"
                  : "border-[#E8EDF5] hover:border-[#CBD5E1]"
              }`}
            >
              {billing === "yearly" && (
                <Check size={14} className="absolute top-3 right-3 text-[#2563EB]" />
              )}
              <p className="text-[#64748B] text-xs mb-1">Pay yearly</p>
              <div className="flex items-center gap-2">
                <p className="text-[#0F172A] font-bold text-sm">${yearlyPrice}/month</p>
                <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">Save 20%</span>
              </div>
            </button>
          </div>
        </div>

        {/* Payment method */}
        <div className="mb-7">
          <p className="text-[#0F172A] font-bold text-sm mb-3">Payment method</p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "card", label: "Credit or Debit card" },
              { id: "paypal", label: "PayPal" },
              { id: "apple", label: "Apple Pay" },
              { id: "google", label: "G Pay" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id as typeof method)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  method === m.id
                    ? "border-[#2563EB] bg-white text-[#2563EB] shadow-sm"
                    : "border-[#E8EDF5] text-[#475569] hover:border-[#CBD5E1]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment information */}
        <div className="mb-7">
          <p className="text-[#0F172A] font-bold text-sm mb-3">Payment information</p>

          {/* Card brand icons */}
          <div className="flex items-center gap-2 mb-4">
            {/* Mastercard */}
            <div className="flex">
              <div className="w-5 h-5 rounded-full bg-[#EB001B]" />
              <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2" />
            </div>
            {/* VISA */}
            <div className="px-2 py-0.5 border border-[#E8EDF5] rounded text-[#1A1F71] font-extrabold text-xs italic">VISA</div>
            {/* Amex */}
            <div className="w-8 h-5 bg-[#2E77BC] rounded flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">AMEX</span>
            </div>
            {/* JCB */}
            <div className="w-8 h-5 bg-gradient-to-r from-[#003087] via-[#CC0000] to-[#009F6B] rounded flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">JCB</span>
            </div>
            {/* Discover */}
            <div className="px-2 py-0.5 border border-[#E8EDF5] rounded text-[#F76F20] font-bold text-[9px]">DISCOVER</div>
          </div>

          <div className="space-y-3">
            {/* Card number */}
            <div>
              <label className="block text-[#475569] text-xs font-medium mb-1">Card number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
                placeholder="0000 0000 0000 0000"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
                maxLength={19}
              />
            </div>

            {/* Expiry + CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#475569] text-xs font-medium mb-1">Expiry date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-[#475569] text-xs font-medium mb-1">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="3-digit code"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
                />
              </div>
            </div>

            {/* Name on card */}
            <div>
              <label className="block text-[#475569] text-xs font-medium mb-1">Name on card</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g Irakli Beridze"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-[#475569] text-xs font-medium mb-1">Address</label>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Street address or P.O box"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1] mb-2"
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Apt., suite, unit, building (Optional)"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#475569] text-xs font-medium mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
                />
              </div>
              <div>
                <label className="block text-[#475569] text-xs font-medium mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State, province, region"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#CBD5E1]"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-[#475569] text-xs font-medium mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                aria-label="Country"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8EDF5] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all appearance-none"
              >
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="gb">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="jp">Japan</option>
                <option value="in">India</option>
                <option value="br">Brazil</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscribe button */}
        <button
          type="button"
          className="w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.35)] active:scale-[0.98] transition-all"
        >
          Subscribe
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
