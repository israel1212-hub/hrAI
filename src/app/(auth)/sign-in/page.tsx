import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Brain, Star, Users, BarChart3, CheckCircle } from "lucide-react";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <FormMessage message={message} />
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
          <h1 className="text-2xl font-bold text-[#0F172A] font-syne mb-1">Welcome Back</h1>
          <p className="text-[#64748B] text-sm mb-8">Please login to your account</p>

          <form className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A] text-sm font-medium">Email</Label>
              <Input
                id="email" name="email" type="email"
                placeholder="Enter your email" required
                className="w-full h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[#0F172A] text-sm font-medium">Password</Label>
                <Link href="/forgot-password" className="text-xs text-[#7C3AED] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password" type="password" name="password"
                placeholder="Enter your password" required
                className="w-full h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-colors"
              />
            </div>

            <SubmitButton
              formAction={signInAction}
              pendingText="Signing in…"
              className="w-full h-11 rounded-lg bg-[#7C3AED] text-white font-semibold text-sm hover:bg-[#6D28D9] transition-colors mt-1"
            >
              Continue with Email
            </SubmitButton>

            <FormMessage message={message} />
          </form>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#7C3AED] font-semibold hover:underline">
              Sign up
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
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#4F6EF7] p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        {/* Top stats */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { icon: <Users size={16} />, label: "Candidates Screened", value: "12,400+" },
            { icon: <BarChart3 size={16} />, label: "Avg Score Accuracy", value: "94%" },
            { icon: <CheckCircle size={16} />, label: "Hires Made", value: "3,200+" },
            { icon: <Star size={16} />, label: "Satisfaction Rate", value: "4.9/5" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
              <div className="text-white/60 mb-2">{s.icon}</div>
              <p className="text-white font-bold text-xl font-syne">{s.value}</p>
              <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10 mb-6">
            <p className="text-white text-base leading-relaxed mb-4">
              "HireMind AI cut our screening time by 70%. The AI scoring is incredibly accurate — we hired our best engineer through it."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sarah K.</p>
                <p className="text-white/60 text-xs">Head of Engineering · TechCorp</p>
              </div>
            </div>
          </div>

          {/* Trusted by */}
          <div>
            <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Trusted by teams at</p>
            <div className="flex items-center gap-6">
              {["Stripe", "Vercel", "Linear", "Notion"].map((b) => (
                <span key={b} className="text-white/50 text-sm font-semibold hover:text-white/80 transition-colors">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
