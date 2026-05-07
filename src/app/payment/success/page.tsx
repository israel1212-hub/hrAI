"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Crown, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 4 seconds
    const t = setTimeout(() => router.push("/dashboard"), 4000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] flex items-center justify-center mx-auto mb-5">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] font-syne mb-2">
          Welcome to Premium! 🎉
        </h1>
        <p className="text-[#64748B] text-sm mb-6">
          Your subscription is now active. All limits have been removed.
        </p>
        <div className="space-y-2 mb-8 text-left">
          {[
            "Unlimited transfers",
            "Unlimited withdrawals",
            "No daily limits",
            "Priority processing",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
              <CheckCircle size={15} className="text-green-500 shrink-0" />
              {f}
            </div>
          ))}
        </div>
        <Link
          href="/dashboard"
          className="block w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] text-white font-bold text-sm hover:opacity-90 transition-all"
        >
          Go to Dashboard
        </Link>
        <p className="text-[#94A3B8] text-xs mt-3">Redirecting automatically…</p>
      </div>
    </div>
  );
}
