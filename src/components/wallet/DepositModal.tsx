"use client";

import { useState, useEffect, useRef } from "react";
import {
  X, Plus, Loader2, Lock, Smartphone,
  CheckCircle, AlertCircle, Clock,
} from "lucide-react";
import { FREE_PLAN_LIMITS } from "@/lib/flutterwave";
import { detectNetwork } from "@/lib/phone";

interface Props {
  plan: "free" | "premium";
  currentBalance: number;
  onClose: () => void;
  onUpgrade: (reason: string) => void;
}

type Step = "form" | "waiting" | "success" | "failed";

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 20000, 50000];

export default function DepositModal({ plan, currentBalance, onClose, onUpgrade }: Props) {
  const [amount, setAmount]   = useState("");
  const [phone, setPhone]     = useState("");
  const [step, setStep]       = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [message, setMessage] = useState("");
  const [paypackRef, setPaypackRef] = useState("");
  const [txRef, setTxRef]     = useState("");
  const [pollCount, setPollCount] = useState(0);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const amountNum = parseFloat(amount) || 0;
  const wouldExceedBalance  = plan === "free" && currentBalance + amountNum > FREE_PLAN_LIMITS.maxBalance;
  const exceedsDepositLimit = plan === "free" && amountNum > FREE_PLAN_LIMITS.maxDeposit;
  const isOverLimit = wouldExceedBalance || exceedsDepositLimit;

  // Detect network from phone number
  const network = phone.length >= 3 ? detectNetwork(phone) : null;

  // ── Polling — check every 3s if user approved USSD ──────────────────────
  useEffect(() => {
    if (step !== "waiting" || !paypackRef) return;

    let attempts = 0;
    const MAX_ATTEMPTS = 40; // 40 × 3s = 2 minutes

    pollRef.current = setInterval(async () => {
      attempts++;
      setPollCount(attempts);

      try {
        const res  = await fetch(`/api/wallet/deposit/status?ref=${paypackRef}&txRef=${txRef}`);
        const data = await res.json();

        if (data.status === "successful") {
          clearInterval(pollRef.current!);
          setStep("success");
          setMessage(data.message);
        } else if (data.status === "failed") {
          clearInterval(pollRef.current!);
          setStep("failed");
          setMessage(data.message || "Payment declined. Please try again.");
        } else if (attempts >= MAX_ATTEMPTS) {
          clearInterval(pollRef.current!);
          setStep("failed");
          setMessage("Timed out — you didn't approve the USSD prompt. Please try again.");
        }
      } catch {
        // Network hiccup — keep polling
      }
    }, 3000);

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [step, paypackRef, txRef]);

  // ── Submit — trigger USSD push ───────────────────────────────────────────
  async function handleDeposit(e: React.FormEvent) {
    e.preventDefault();
    if (isOverLimit) { onUpgrade("Deposit more with Premium plan"); return; }

    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/wallet/deposit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ amount: amountNum, phone }),
      });
      const data = await res.json();

      if (res.ok && data.ref) {
        setPaypackRef(data.ref);
        setTxRef(data.txRef);
        setStep("waiting");
      } else if (data.upgradeRequired) {
        onUpgrade(data.error);
      } else {
        setError(data.error || "Failed to initiate deposit");
      }
    } catch (err: any) {
      setError(err.message || "Request failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
              <Plus size={15} className="text-green-600" />
            </div>
            <span className="font-bold text-[#0F172A] font-jakarta">Deposit via MoMo</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            disabled={step === "waiting"}
            className="text-[#94A3B8] hover:text-[#0F172A] transition-colors disabled:opacity-30"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">

          {/* ── STEP: Form ─────────────────────────────────────────────── */}
          {step === "form" && (
            <form onSubmit={handleDeposit} className="flex flex-col gap-4">

              {/* Free plan notice */}
              {plan === "free" && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Lock size={13} className="text-amber-600 shrink-0" />
                  <p className="text-amber-700 text-xs">
                    Free plan: max <strong>{FREE_PLAN_LIMITS.maxDeposit.toLocaleString()} RWF</strong> deposit,{" "}
                    max balance <strong>{FREE_PLAN_LIMITS.maxBalance.toLocaleString()} RWF</strong>.{" "}
                    <button type="button" onClick={() => onUpgrade("Deposit unlimited with Premium")} className="underline font-semibold">Upgrade</button>
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
                {/* Network detection badge */}
                {network && network !== "UNKNOWN" && (
                  <div className={`mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    network === "MTN"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    ✓ {network} MoMo detected
                  </div>
                )}
                {network === "UNKNOWN" && phone.length >= 9 && (
                  <p className="text-red-500 text-[10px] mt-1">
                    Unrecognized number. Use MTN (078/079/077/076) or Airtel (073/072).
                  </p>
                )}
              </div>

              {/* Quick amounts */}
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-2">Amount (RWF)</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {QUICK_AMOUNTS.map((a) => {
                    const over = plan === "free" && (a > FREE_PLAN_LIMITS.maxDeposit || currentBalance + a > FREE_PLAN_LIMITS.maxBalance);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => over ? onUpgrade("Deposit more with Premium") : setAmount(String(a))}
                        className={`relative py-2 rounded-xl text-xs font-semibold border transition-colors ${
                          amount === String(a)
                            ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                            : over
                            ? "bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]"
                            : "bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:border-[#7C3AED] hover:text-[#7C3AED]"
                        }`}
                      >
                        {over && <Lock size={8} className="absolute top-1 right-1 text-[#94A3B8]" />}
                        {a.toLocaleString()}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Or enter custom amount"
                  min="100"
                  required
                  className={`w-full px-4 py-3 rounded-xl border bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:ring-2 transition-colors ${
                    isOverLimit
                      ? "border-red-300 focus:ring-red-100"
                      : "border-[#E2E8F0] focus:border-[#7C3AED] focus:ring-[#7C3AED]/10"
                  }`}
                />
                {isOverLimit && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <Lock size={10} />
                    {exceedsDepositLimit ? "Exceeds max deposit limit." : "Would exceed max balance."}{" "}
                    <button type="button" onClick={() => onUpgrade("Deposit more with Premium")} className="underline">Upgrade</button>
                  </p>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || isOverLimit || !amountNum || !phone || network === "UNKNOWN"}
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Smartphone size={16} />}
                {loading ? "Sending USSD prompt…" : `Deposit ${amountNum ? amountNum.toLocaleString() + " RWF" : ""} via MoMo`}
              </button>

              <p className="text-center text-[10px] text-[#94A3B8]">
                A USSD prompt will appear on your phone. Enter your MoMo PIN to confirm.
              </p>
            </form>
          )}

          {/* ── STEP: Waiting for USSD approval ────────────────────────── */}
          {step === "waiting" && (
            <div className="text-center py-6">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="w-20 h-20 rounded-full border-4 border-[#F3F0FF] flex items-center justify-center">
                  <Smartphone size={32} className="text-[#7C3AED]" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                  <Clock size={12} className="text-white" />
                </div>
              </div>
              <h3 className="font-bold text-[#0F172A] font-jakarta mb-2">Check Your Phone!</h3>
              <p className="text-[#64748B] text-sm mb-1">
                A USSD prompt has been sent to
              </p>
              <p className="font-bold text-[#0F172A] text-base mb-4">{phone}</p>
              <div className="bg-[#F8FAFC] rounded-xl p-3 mb-4 text-left">
                <p className="text-xs text-[#64748B] font-semibold mb-1">Steps:</p>
                <ol className="text-xs text-[#475569] space-y-1 list-decimal list-inside">
                  <li>Open the USSD prompt on your phone</li>
                  <li>Enter your {network || "MoMo"} PIN</li>
                  <li>Confirm the payment of <strong>{amountNum.toLocaleString()} RWF</strong></li>
                </ol>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#94A3B8] text-xs">
                <Loader2 size={12} className="animate-spin" />
                Waiting for confirmation… ({Math.max(0, 40 - pollCount) * 3}s remaining)
              </div>
              <p className="text-[10px] text-[#94A3B8] mt-2">Do not close this window</p>
            </div>
          )}

          {/* ── STEP: Success ───────────────────────────────────────────── */}
          {step === "success" && (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-[#0F172A] font-jakarta mb-2">Deposit Successful!</h3>
              <p className="text-[#64748B] text-sm mb-6">{message}</p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#7C3AED] text-white rounded-xl font-semibold text-sm hover:bg-[#6D28D9] transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {/* ── STEP: Failed ────────────────────────────────────────────── */}
          {step === "failed" && (
            <div className="text-center py-6">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-[#0F172A] font-jakarta mb-2">Deposit Failed</h3>
              <p className="text-[#64748B] text-sm mb-6">{message}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setStep("form"); setError(""); }}
                  className="px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-[#E2E8F0] text-[#64748B] rounded-xl text-sm font-semibold hover:border-[#7C3AED] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
