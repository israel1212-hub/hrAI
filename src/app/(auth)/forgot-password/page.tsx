import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { forgotPasswordAction } from "@/app/actions";
import { UrlProvider } from "@/components/url-provider";
import { Brain, Mail, ShieldCheck, Clock } from "lucide-react";

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT — Form ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between px-8 py-10 bg-white max-w-[520px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
            <Brain size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm text-[#0F172A] font-syne">HireMind AI</span>
        </Link>

        {/* Form */}
        <div className="w-full max-w-[360px] mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-5">
            <Mail size={22} className="text-[#7C3AED]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-syne mb-1">Reset Password</h1>
          <p className="text-[#64748B] text-sm mb-8">
            Enter your email and we&apos;ll send you a reset link
          </p>

          <UrlProvider>
            <form className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[#0F172A] text-sm font-medium">Email address</Label>
                <Input
                  id="email" name="email" type="email"
                  placeholder="you@example.com" required
                  className="w-full h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-colors"
                />
              </div>

              <SubmitButton
                formAction={forgotPasswordAction}
                pendingText="Sending reset link…"
                className="w-full h-11 rounded-lg bg-[#7C3AED] text-white font-semibold text-sm hover:bg-[#6D28D9] transition-colors mt-1"
              >
                Send Reset Link
              </SubmitButton>

              <FormMessage message={searchParams} />
            </form>
          </UrlProvider>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-[#7C3AED] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-5 text-xs text-[#94A3B8]">
          <Link href="/" className="hover:text-[#64748B] transition-colors">Privacy</Link>
          <Link href="/" className="hover:text-[#64748B] transition-colors">Terms</Link>
          <Link href="/" className="hover:text-[#64748B] transition-colors">Support</Link>
        </div>
      </div>

      {/* ── RIGHT — Branding panel ───────────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 flex-col justify-center bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#4F6EF7] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 space-y-6">
          <h2 className="text-white text-3xl font-extrabold font-syne leading-tight">
            Secure account<br />recovery
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            We take your account security seriously. Your reset link expires in 1 hour and can only be used once.
          </p>

          <div className="space-y-4 mt-4">
            {[
              { icon: <Mail size={16} />, title: "Check your inbox", desc: "Reset link sent to your email address" },
              { icon: <Clock size={16} />, title: "Link expires in 1 hour", desc: "Request a new one if it expires" },
              { icon: <ShieldCheck size={16} />, title: "Secure & encrypted", desc: "Your data is always protected" },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white/80 shrink-0 mt-0.5">
                  {s.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{s.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
