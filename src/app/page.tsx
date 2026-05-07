import Link from "next/link";
import {
  ArrowRight, Brain, ClipboardList, BarChart3,
  CheckCircle, Shield, Zap, Crown, Lock,
  Users, Star, TrendingUp, MessageSquare,
} from "lucide-react";
import Footer from "@/components/footer";
import MarketingNav from "@/components/marketing-nav";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <MarketingNav />

      {/* ── HERO (hero-section-4 style) ──────────────────────────────────── */}
      <section className="relative bg-[#FAFAFA] border-b border-[#F1F5F9] overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-20 pb-0 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-full text-xs font-semibold text-[#7C3AED] mb-6 shadow-sm">
            <Zap size={11} className="text-yellow-500" />
            HireMind AI raises $2M seed round
            <span className="text-[#94A3B8] font-normal">· Read →</span>
          </div>

          {/* Headline */}
          <h1 className="text-[#0F172A] text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 font-syne tracking-tight max-w-[800px] mx-auto">
            Transform Your Hiring with{" "}
            <span className="text-[#7C3AED]">AI Interviews</span>
          </h1>

          {/* Subtext */}
          <p className="text-[#64748B] text-lg sm:text-xl leading-relaxed mb-8 max-w-[560px] mx-auto">
            Efficiently screen candidates with AI-generated questions, automatic scoring, and clear hire/reject decisions.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <Link
              href="/sign-up"
              className="flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-lg font-semibold text-sm hover:bg-[#6D28D9] shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition-all"
            >
              Get Started Free <ArrowRight size={15} />
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all shadow-sm"
            >
              See how it works
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto max-w-[900px]">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-t from-[#7C3AED]/10 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_24px_80px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Mock top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F1F5F9] bg-[#FAFAFA]">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 h-6 bg-[#F1F5F9] rounded-md flex items-center px-3">
                  <span className="text-[#94A3B8] text-[10px]">app.hiremind.ai/dashboard</span>
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="p-5 bg-[#F8FAFC]">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Sessions", value: "248", color: "text-[#7C3AED]" },
                    { label: "Avg Score", value: "87%", color: "text-green-600" },
                    { label: "Hired", value: "42", color: "text-[#2563EB]" },
                    { label: "Time Saved", value: "320h", color: "text-orange-500" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-3 border border-[#F1F5F9] shadow-sm">
                      <p className={`text-xl font-extrabold font-syne ${s.color}`}>{s.value}</p>
                      <p className="text-[#94A3B8] text-[10px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Candidate card */}
                  <div className="col-span-2 bg-white rounded-xl border border-[#F1F5F9] shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#0F172A]">Recent Interviews</span>
                      <span className="text-[10px] text-[#94A3B8]">Today</span>
                    </div>
                    {[
                      { name: "Alice M.", role: "Frontend Dev", score: 92, verdict: "Hire", color: "bg-green-100 text-green-700" },
                      { name: "Bob K.", role: "Product Manager", score: 74, verdict: "Maybe", color: "bg-yellow-100 text-yellow-700" },
                      { name: "Carol T.", role: "Data Analyst", score: 88, verdict: "Hire", color: "bg-green-100 text-green-700" },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center justify-between py-2 border-b border-[#F8FAFC] last:border-0">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] flex items-center justify-center text-white text-[9px] font-bold">
                            {c.name[0]}
                          </div>
                          <div>
                            <p className="text-[#0F172A] text-[11px] font-semibold">{c.name}</p>
                            <p className="text-[#94A3B8] text-[9px]">{c.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#0F172A] text-[11px] font-bold">{c.score}/100</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${c.color}`}>{c.verdict}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI insights */}
                  <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] rounded-xl p-4 text-white">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Brain size={13} className="text-yellow-300" />
                      <span className="text-[11px] font-bold">AI Insights</span>
                    </div>
                    <p className="text-white/80 text-[10px] leading-relaxed mb-3">
                      Top candidates this week scored 23% higher than average. Frontend roles are most competitive.
                    </p>
                    <div className="bg-white/15 rounded-lg p-2">
                      <p className="text-white text-[10px] font-semibold">Recommendation</p>
                      <p className="text-white/70 text-[9px] mt-0.5">Schedule final interviews for Alice M. and Carol T.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by strip */}
        <div className="relative z-10 border-t border-[#F1F5F9] bg-white mt-0 py-5">
          <div className="max-w-[1100px] mx-auto px-6">
            <p className="text-center text-[#94A3B8] text-xs mb-4 uppercase tracking-wider font-medium">
              Trusted by hiring teams at
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {["Stripe", "Vercel", "Linear", "Notion", "Figma", "Loom"].map((b) => (
                <span key={b} className="text-[#CBD5E1] text-sm font-bold hover:text-[#94A3B8] transition-colors">
                  {b}
                </span>
              ))}
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
