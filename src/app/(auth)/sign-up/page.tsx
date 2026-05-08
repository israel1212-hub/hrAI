import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { UrlProvider } from "@/components/url-provider";
import { Brain, ClipboardList, BarChart3, CheckCircle } from "lucide-react";

export default async function Signup(props: { searchParams: Promise<Message> }) {
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
          <span className="font-bold text-sm text-[#0F172A] font-syne">HireMind</span>
        </Link>

        {/* Form */}
        <div className="w-full max-w-[360px] mx-auto">
          <h1 className="text-2xl font-bold text-[#0F172A] font-syne mb-1">Create Account</h1>
          <p className="text-[#64748B] text-sm mb-8">Start hiring smarter today</p>

          <UrlProvider>
            <form className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="full_name" className="text-[#0F172A] text-sm font-medium">Full Name</Label>
                <Input
                  id="full_name" name="full_name" type="text"
                  placeholder="Alex Johnson" required
                  className="w-full h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[#0F172A] text-sm font-medium">Email</Label>
                <Input
                  id="email" name="email" type="email"
                  placeholder="you@company.com" required
                  className="w-full h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[#0F172A] text-sm font-medium">Password</Label>
                <Input
                  id="password" type="password" name="password"
                  placeholder="Min. 6 characters" minLength={6} required
                  className="w-full h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/20 transition-colors"
                />
              </div>

              <SubmitButton
                formAction={signUpAction}
                pendingText="Creating account…"
                className="w-full h-11 rounded-lg bg-[#7C3AED] text-white font-semibold text-sm hover:bg-[#6D28D9] transition-colors mt-1"
              >
                Create Account
              </SubmitButton>

              <FormMessage message={searchParams} />
            </form>
          </UrlProvider>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Already have an account?{" "}
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
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#4F6EF7] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        {/* Features list */}
        <div className="relative z-10">
          <h2 className="text-white text-3xl font-extrabold font-syne mb-3 leading-tight">
            Hire the right people,<br />faster than ever
          </h2>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            AI-generated questions, automatic scoring, and clear hire/reject decisions — all in one platform.
          </p>
          <div className="space-y-3">
            {[
              { icon: <Brain size={15} />, text: "Auto-generates role-specific interview questions" },
              { icon: <BarChart3 size={15} />, text: "Automatic scoring with keyword analysis" },
              { icon: <ClipboardList size={15} />, text: "Structured sessions with full candidate history" },
              { icon: <CheckCircle size={15} />, text: "Clear hire / maybe / reject recommendations" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-white/80 shrink-0">
                  {f.icon}
                </div>
                <span className="text-white/80 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
            <p className="text-white text-sm leading-relaxed mb-4">
              "We went from 2-week screening processes to 2 days. HireMind is a game changer for our hiring team."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Marcus T.</p>
                <p className="text-white/60 text-xs">CTO · StartupHub</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
