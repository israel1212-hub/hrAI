import Link from "next/link";
import {
  ArrowRight, Brain, ClipboardList, BarChart3,
  CheckCircle, Shield, Zap, Crown, Lock,
  Users, Star, MessageSquare, Apple, Smartphone,
} from "lucide-react";
import Footer from "@/components/footer";
import MarketingNav from "@/components/marketing-nav";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <MarketingNav />

      {/* ── HERO (hero-section-2 style) ──────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Background image — clouds/landscape */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg" />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Nav is above, content below */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 max-w-[800px] mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-8">
            <Zap size={11} className="text-yellow-400" />
            AI-Powered Hiring Platform · Free to start
          </div>

          {/* Headline */}
          <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 font-syne tracking-tight">
            Your AI Hiring Partner,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]">
              Always On
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-[520px]">
            Generate interview questions, score candidates automatically, and make confident hiring decisions — all in one place.
          </p>

          {/* CTA Buttons — styled like app store buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link
              href="/sign-up"
              className="flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#0F172A] rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow-lg"
            >
              <Brain size={16} className="text-[#7C3AED]" />
              Start Hiring Free
            </Link>
            <Link
              href="/sign-in"
              className="flex items-center gap-2.5 px-6 py-3.5 bg-white/10 border border-white/30 backdrop-blur-sm text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all"
            >
              <Smartphone size={16} />
              Sign In
            </Link>
          </div>

          {/* Award badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-white text-xs font-bold">Best AI Hiring Tool</p>
                <p className="text-white/60 text-[10px]">Product Hunt · 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <Users size={14} className="text-white/70" />
              <div className="text-left">
                <p className="text-white text-xs font-bold">12,400+ Screened</p>
                <p className="text-white/60 text-[10px]">Candidates this month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-[#F1F5F9]">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-center text-[#94A3B8] text-xs mb-5 uppercase tracking-wider font-medium">
            Trusted by hiring teams at
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {["Stripe", "Vercel", "Linear", "Notion", "Figma", "Loom"].map((b) => (
              <span key={b} className="text-[#CBD5E1] text-sm font-bold hover:text-[#94A3B8] transition-colors cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[#0F172A] text-4xl font-extrabold font-syne mb-3">How it works</h2>
            <p className="text-[#64748B] text-lg">From job title to hiring decision in minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: <ClipboardList size={22} className="text-[#7C3AED]" />, bg: "bg-[#F3F0FF]", title: "Set the Role", desc: "Enter the job title. AI generates tailored questions instantly." },
              { step: "02", icon: <MessageSquare size={22} className="text-[#2563EB]" />, bg: "bg-blue-50", title: "Run Interview", desc: "Candidate answers text-based questions at their own pace." },
              { step: "03", icon: <Brain size={22} className="text-green-600" />, bg: "bg-green-50", title: "AI Scores", desc: "AI evaluates answers against keywords, depth, and relevance." },
              { step: "04", icon: <BarChart3 size={22} className="text-orange-500" />, bg: "bg-orange-50", title: "Hire Decision", desc: "Get a clear score and AI recommendation: Hire, Maybe, or Reject." },
            ].map((s) => (
              <div key={s.step} className="relative bg-white rounded-2xl p-6 border border-[#F1F5F9] hover:border-[#7C3AED]/30 hover:shadow-md transition-all">
                <span className="absolute top-4 right-4 text-[#E2E8F0] text-2xl font-extrabold font-syne">{s.step}</span>
                <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mb-4`}>{s.icon}</div>
                <h3 className="text-[#0F172A] font-bold text-base mb-2 font-syne">{s.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[#0F172A] text-4xl font-extrabold font-syne mb-3">Everything you need to hire right</h2>
            <p className="text-[#64748B] text-lg">Built for modern hiring teams</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Brain size={22} className="text-[#7C3AED]" />, bg: "bg-[#F3F0FF]", title: "AI Question Generator", desc: "Automatically creates role-specific questions based on job title and required skills." },
              { icon: <BarChart3 size={22} className="text-[#2563EB]" />, bg: "bg-blue-50", title: "Automatic Scoring", desc: "Each answer is scored against keywords, minimum word count, and relevance." },
              { icon: <Users size={22} className="text-green-600" />, bg: "bg-green-50", title: "Candidate Management", desc: "Track all candidates, sessions, and scores in one organized dashboard." },
              { icon: <ClipboardList size={22} className="text-orange-500" />, bg: "bg-orange-50", title: "Custom Question Bank", desc: "Build your own question library with categories, points, and keywords." },
              { icon: <Shield size={22} className="text-[#0F172A]" />, bg: "bg-[#F8FAFC]", title: "Secure & Private", desc: "All interview data is encrypted and only accessible to your team." },
              { icon: <Crown size={22} className="text-yellow-500" />, bg: "bg-yellow-50", title: "Premium Plan", desc: "Unlock unlimited interviews, advanced analytics, and priority support." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-[#F1F5F9] hover:border-[#7C3AED]/30 hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4`}>{f.icon}</div>
                <h3 className="text-[#0F172A] font-bold text-base mb-2 font-syne">{f.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[#0F172A] text-4xl font-extrabold font-syne mb-3">Simple Pricing</h2>
            <p className="text-[#64748B] text-lg">Start free, upgrade when your team grows</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-[#F1F5F9] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList size={18} className="text-[#64748B]" />
                <span className="font-bold text-[#0F172A] font-syne">Free</span>
              </div>
              <p className="text-4xl font-extrabold text-[#0F172A] font-syne mb-1">$0</p>
              <p className="text-[#64748B] text-sm mb-6">Forever free</p>
              <div className="space-y-3 mb-6">
                {["5 interviews/month", "AI question generation", "Basic scoring", "Candidate results", "Email support"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                    <CheckCircle size={14} className="text-green-500 shrink-0" /> {f}
                  </div>
                ))}
                {["Unlimited interviews", "Advanced analytics", "Custom branding"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Lock size={14} className="text-[#CBD5E1] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/sign-up" className="block w-full text-center py-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                Get Started Free
              </Link>
            </div>

            <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] rounded-2xl p-7 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Crown size={18} className="text-yellow-300" />
                  <span className="font-bold font-syne">Premium</span>
                </div>
                <p className="text-4xl font-extrabold font-syne mb-1">2,000 <span className="text-lg text-white/60">RWF/mo</span></p>
                <p className="text-white/60 text-sm mb-6">or 15,000 RWF/year · save 9,000</p>
                <div className="space-y-3 mb-6">
                  {["Everything in Free", "Unlimited interviews", "Advanced AI scoring", "Analytics dashboard", "Custom question bank", "Priority support"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle size={14} className="text-yellow-300 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link href="/payment" className="block w-full text-center py-3 rounded-xl bg-white text-[#7C3AED] font-bold text-sm hover:bg-white/90 transition-colors">
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
