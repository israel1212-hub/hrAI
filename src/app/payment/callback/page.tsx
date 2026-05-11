"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Crown } from "lucide-react";
import Link from "next/link";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const transactionId = decodeURIComponent(searchParams.get("transaction_id") || "");
    const txRef = searchParams.get("tx_ref");
    const flwStatus = searchParams.get("status");

    if (flwStatus === "cancelled") {
      setStatus("failed");
      setMessage("Payment was cancelled.");
      return;
    }

    if (!transactionId) {
      setStatus("failed");
      setMessage("No transaction ID received.");
      return;
    }

    fetch("/api/flutterwave/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId, txRef }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.type === "subscription") {
          setStatus("success");
          setMessage("Your account has been upgraded to Premium!");
          setTimeout(() => router.push("/dashboard"), 3000);
        } else if (data.success) {
          setStatus("success");
          setMessage("Payment successful!");
          setTimeout(() => router.push("/dashboard"), 3000);
        } else {
          setStatus("failed");
          setMessage(data.message || "Payment verification failed.");
        }
      })
      .catch(() => {
        setStatus("failed");
        setMessage("An error occurred during verification.");
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-[#7C3AED] animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0F172A] font-jakarta mb-2">Verifying Payment</h2>
            <p className="text-[#64748B] text-sm">Please wait…</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#F97316] flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] font-jakarta mb-2">Welcome to Premium! 🎉</h2>
            <p className="text-[#64748B] text-sm mb-6">{message}</p>
            <p className="text-xs text-[#94A3B8]">Redirecting to dashboard…</p>
          </>
        )}
        {status === "failed" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0F172A] font-jakarta mb-2">Payment Failed</h2>
            <p className="text-[#64748B] text-sm mb-6">{message}</p>
            <div className="flex flex-col gap-3">
              <Link href="/payment" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-xl font-semibold text-sm hover:bg-[#6D28D9] transition-colors">
                Try Again
              </Link>
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#E2E8F0] text-[#64748B] rounded-xl font-semibold text-sm hover:text-[#0F172A] hover:border-[#CBD5E1] transition-colors">
                Back to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
