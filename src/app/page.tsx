import Link from "next/link";
import {
  ArrowRight, Brain, ClipboardList, BarChart3,
  CheckCircle, Shield, Zap, Crown, Lock,
  Users, Star, MessageSquare,
} from "lucide-react";
import Footer from "@/components/footer";
import MarketingNav from "@/components/marketing-nav";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <MarketingNav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-grid-blue" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-14">

          {/* Left */}
          <div className="flex-1 max-w-[520px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EEF4FF] text-[#2563EB] rounded-full text-xs font-semibold mb-6 border border-[#BFDBFE]">
              <Zap size={11} /> AI-Powered Hiring Platform
            </div>
            <h1 className="text-[#0F172A] text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-5 font-syne">
              Hire Smarter<br />
              <span className="text-[#7C3AED]">with AI Interviews</span>
            </h1>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              HireMind AI generates tailored interview questions, scores candidates automatically, and helps you decide who to hire — all in one platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="flex items-center gap-2 px-6 py-3.5 bg-[#7C3AED] text-white rounded-full font-semibold text-sm hover:bg-[#6D28D9] shadow-[0_4px_14px_rgba(124,58,237,0.4)] transition-all"
              >
                Start Hiring Free <ArrowRight size={16} />
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-6 py-3.5 border border-[#CBD5E1] text-[#0F172A] rounded-full font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8">
              {[
                { label: "Free to start",     icon: <CheckCircle size={14} className="text-green-500" /> },
                { label: "AI-powered scoring", icon: <Brain size={14} className="text-[#7C3AED]" /> },
                { label: "Instant results",    icon: <Zap size={14} className="text-[#2563EB]" /> },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  {b.icon} {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — interview card mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[320px]">
              <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Brain size={16} className="text-white/70" />
                    <span className="text-white/70 text-xs">AI Interview</span>
                  </div>
                  <span className="bg-green-400/20 border border-green-400/30 text-green-300 text-[9px] font-bold px-2 py-0.5 rounded-full">LIVE</span>
                </div>
                <p className="text-white/60 text-xs mb-1">Candidate</p>
                <p className="font-bold text-lg font-syne mb-1">John Doe</p>
                <p className="text-white/60 text-xs mb-4">Software Engineer · 3 questions</p>
                <div className="bg-white/10 rounded-xl p-3 mb-4">
                  <p className="text-white/80 text-xs leading-relaxed">
                    "Tell me about a challenging problem you solved and how you approached it…"
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-[10px]">AI Score</p>
                    <p className="text-2xl font-extrabold font-syne">87<span className="text-sm text-white/60">/100</span></p>
                  </div>
                  <div className="bg-green-400/20 border border-green-400/30 rounded-xl px-3 py-2 text-center">
                    <p className="text-green-300 text-xs font-bold">HIRE ✓</p>
                  </div>
                </div>
              </div>
              {/* Floating score badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-[#F1F5F9] w-[160px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F3F0FF] flex items-center justify-center">
                    <Star size={14} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="text-[#0F172A] text-xs font-bold">Top Candidate</p>
                    <p className="text-[#94A3B8] text-[10px]">AI recommended</p>
                  </div>
                </div>
              </div>
            </div>
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
              { step: "01", icon: <ClipboardList size={22} className="text-[#7C3AED]" />, bg: "bg-[#F3F0FF]", title: "Set the Role", desc: "Enter the job title and requirements. AI generates tailored questions instantly." },
              { step: "02", icon: <MessageSquare size={22} className="text-[#2563EB]" />, bg: "bg-blue-50",    title: "Run Interview", desc: "Candidate answers text-based questions at their own pace." },
              { step: "03", icon: <Brain size={22} className="text-green-600" />,          bg: "bg-green-50",  title: "AI Scores", desc: "AI evaluates answers against keywords, depth, and relevance." },
              { step: "04", icon: <BarChart3 size={22} className="text-orange-500" />,     bg: "bg-orange-50", title: "Hire Decision", desc: "Get a clear score and AI recommendation: Hire, Maybe, or Reject." },
            ].map((s) => (
              <div key={s.step} className="relative bg-white rounded-2xl p-6 border border-[#F1F5F9] hover:border-[#7C3AED]/30 hover:shadow-md transition-all">
                <span className="absolute top-4 right-4 text-[#E2E8F0] text-2xl font-extrabold font-syne">{s.step}</span>
                <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  {s.icon}
                </div>
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
              { icon: <Brain size={22} className="text-[#7C3AED]" />,        bg: "bg-[#F3F0FF]", title: "AI Question Generator",   desc: "Automatically creates role-specific questions based on job title and required skills." },
              { icon: <BarChart3 size={22} className="text-[#2563EB]" />,     bg: "bg-blue-50",   title: "Automatic Scoring",       desc: "Each answer is scored against keywords, minimum word count, and relevance." },
              { icon: <Users size={22} className="text-green-600" />,         bg: "bg-green-50",  title: "Candidate Management",    desc: "Track all candidates, sessions, and scores in one organized dashboard." },
              { icon: <ClipboardList size={22} className="text-orange-500" />,bg: "bg-orange-50", title: "Custom Question Bank",    desc: "Build your own question library with categories, points, and keywords." },
              { icon: <Shield size={22} className="text-[#0F172A]" />,        bg: "bg-[#F8FAFC]", title: "Secure & Private",        desc: "All interview data is encrypted and only accessible to your team." },
              { icon: <Crown size={22} className="text-yellow-500" />,        bg: "bg-yellow-50", title: "Premium Plan",            desc: "Unlock unlimited interviews, advanced analytics, and priority support." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-[#F1F5F9] hover:border-[#7C3AED]/30 hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
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

            {/* Free */}
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

            {/* Premium */}
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
