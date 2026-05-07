import Link from "next/link";
import {
  ArrowRight, Brain, ClipboardList, BarChart3,
  CheckCircle, Shield, Zap, Crown, Lock,
  Users, Star, MessageSquare, ChevronRight,
  TrendingUp, FileText, Bell,
} from "lucide-react";
import Footer from "@/components/footer";
import MarketingNav from "@/components/marketing-nav";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <MarketingNav />

      {/* ── HERO (Beyond UI layout) ──────────────────────────────────────── */}
      <section className="relative bg-white pt-28 pb-0 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] pb-16">

            {/* ── LEFT — Text content ──────────────────────────────────── */}
            <div className="flex flex-col justify-center">
              {/* Version badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#64748B] mb-8 w-fit shadow-sm">
                <Zap size={10} className="text-[#7C3AED]" />
                2.0 version is here
              </div>

              {/* Headline — mixed weight like Beyond UI */}
              <h1 className="text-[#0F172A] text-5xl sm:text-6xl font-black leading-[1.08] mb-6 tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                Welcome to the{" "}
                <span className="italic font-light text-[#7C3AED]">AI hiring</span>{" "}
                platform
              </h1>

              <p className="text-[#64748B] text-base leading-relaxed mb-8 max-w-[420px]">
                Generate interview questions, score candidates automatically, and make confident hiring decisions — all in one place.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white rounded-xl font-semibold text-sm hover:bg-[#1E293B] transition-all shadow-sm"
                >
                  Get Started
                </Link>
                <Link
                  href="#how-it-works"
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all shadow-sm"
                >
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* ── RIGHT — Floating cards grid ──────────────────────────── */}
            <div className="relative grid grid-cols-2 gap-4 h-[480px]">

              {/* Main image card — tall, left column */}
              <div className="row-span-2 bg-[#F3F0FF] rounded-3xl overflow-hidden shadow-sm border border-[#EDE9FE] relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {/* Mock phone/dashboard visual */}
                  <div className="w-full max-w-[160px] bg-white rounded-2xl shadow-xl border border-[#F1F5F9] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                        <Brain size={12} className="text-white" />
                      </div>
                      <span className="text-[#0F172A] text-[10px] font-bold">Interview</span>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="h-2 bg-[#F1F5F9] rounded-full w-full" />
                      <div className="h-2 bg-[#F1F5F9] rounded-full w-4/5" />
                      <div className="h-2 bg-[#F1F5F9] rounded-full w-3/5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#94A3B8] text-[9px]">Score</span>
                      <span className="text-[#7C3AED] text-sm font-extrabold">87/100</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] rounded-full" />
                    </div>
                    <div className="mt-3 w-full py-1.5 bg-[#7C3AED] rounded-lg text-center">
                      <span className="text-white text-[9px] font-bold">✓ HIRE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat card 1 — top right */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F1F5F9] flex flex-col justify-center">
                <p className="text-[#0F172A] text-4xl font-black tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>12k+</p>
                <p className="text-[#94A3B8] text-sm mt-1">Candidates screened</p>
              </div>

              {/* Stat card 2 — bottom right */}
              <div className="bg-[#F3F0FF] rounded-3xl p-6 shadow-sm border border-[#EDE9FE] flex flex-col justify-between">
                <div>
                  <p className="text-[#0F172A] text-4xl font-black tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>94%</p>
                  <p className="text-[#64748B] text-sm mt-1">Scoring accuracy</p>
                </div>
                {/* Avatar stack */}
                <div className="flex items-center mt-4">
                  {["A", "B", "C", "D", "E"].map((l, i) => (
                    <div
                      key={l}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold"
                      style={{
                        marginLeft: i === 0 ? 0 : -8,
                        backgroundColor: ["#7C3AED", "#4F6EF7", "#2563EB", "#7C3AED", "#A78BFA"][i],
                        zIndex: 5 - i,
                      }}
                    >
                      {l}
                    </div>
                  ))}
                  <span className="text-[#64748B] text-[10px] ml-2">+80k users</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom fade into logo cloud */}
        <div className="h-px bg-[#F1F5F9]" />
      </section>

      {/* ── LOGO CLOUD (logo-cloud-4) ─────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#F1F5F9]">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-center text-[#94A3B8] text-xs mb-8 uppercase tracking-widest font-medium">
            Trusted by hiring teams at
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {[
              { name: "Stripe", color: "#635BFF" },
              { name: "Vercel", color: "#000000" },
              { name: "Linear", color: "#5E6AD2" },
              { name: "Notion", color: "#000000" },
              { name: "Figma", color: "#F24E1E" },
              { name: "Loom", color: "#625DF5" },
              { name: "Intercom", color: "#1F8DED" },
              { name: "Slack", color: "#4A154B" },
            ].map((b) => (
              <span key={b.name} className="text-[#CBD5E1] text-sm font-bold hover:text-[#94A3B8] transition-colors cursor-default tracking-tight">
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (how-it-works-2) ────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-[560px] mb-16">
            <p className="text-[#7C3AED] text-sm font-semibold mb-3">How it works</p>
            <h2 className="text-[#0F172A] text-4xl font-extrabold font-syne mb-4 leading-tight">
              Set up your hiring pipeline in minutes with HireMind AI
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                step: "01",
                title: "Generate role-specific questions instantly",
                desc: "Enter the job title and requirements. Our AI creates tailored interview questions with scoring criteria, keywords, and minimum word counts — ready in seconds.",
                stat: "90+ job roles supported",
                statSub: "56% faster screening",
                icon: <Brain size={24} className="text-[#7C3AED]" />,
                bg: "bg-[#F3F0FF]",
              },
              {
                step: "02",
                title: "Run structured text-based interviews",
                desc: "Candidates answer questions at their own pace. No scheduling, no video calls. Our platform guides them through each question with clear instructions.",
                stat: "Glodie L., HR Manager",
                statSub: '"Cut our screening time by 70%"',
                icon: <MessageSquare size={24} className="text-[#2563EB]" />,
                bg: "bg-blue-50",
              },
              {
                step: "03",
                title: "Get AI scores and hire/reject decisions",
                desc: "Every answer is automatically scored. You get a total score, per-question breakdown, and a clear AI recommendation: Hire, Maybe, or Reject.",
                stat: "94% scoring accuracy",
                statSub: "Verified by hiring teams",
                icon: <BarChart3 size={24} className="text-green-600" />,
                bg: "bg-green-50",
              },
            ].map((s, i) => (
              <div key={s.step} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 ${i < 2 ? "border-b border-[#F1F5F9]" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#E2E8F0] text-5xl font-extrabold font-syne leading-none">{s.step}</span>
                  </div>
                  <h3 className="text-[#0F172A] text-2xl font-bold font-syne mb-4 leading-tight">{s.title}</h3>
                  <p className="text-[#64748B] text-base leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>{s.icon}</div>
                    <div>
                      <p className="text-[#0F172A] text-sm font-bold">{s.stat}</p>
                      <p className="text-[#94A3B8] text-xs">{s.statSub}</p>
                    </div>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className={`${s.bg} rounded-2xl p-6 border border-[#F1F5F9]`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm`}>{s.icon}</div>
                      <div>
                        <p className="text-[#0F172A] text-sm font-bold">Step {s.step}</p>
                        <p className="text-[#94A3B8] text-xs">{s.stat}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className={`h-3 bg-white/60 rounded-full ${j === 0 ? "w-full" : j === 1 ? "w-4/5" : "w-3/5"}`} />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-[#64748B] text-xs">{s.statSub}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (features-1) ────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#7C3AED] text-sm font-semibold mb-3">Features</p>
            <h2 className="text-[#0F172A] text-4xl font-extrabold font-syne mb-4">Everything you need to hire right</h2>
            <p className="text-[#64748B] text-lg max-w-[480px] mx-auto">Built for modern hiring teams who want speed, accuracy, and confidence.</p>
          </div>

          {/* Two large feature cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-8 border border-[#F1F5F9] shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F3F0FF] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#F3F0FF] rounded-2xl flex items-center justify-center mb-5">
                  <Brain size={22} className="text-[#7C3AED]" />
                </div>
                <h3 className="text-[#0F172A] text-xl font-bold font-syne mb-3">Powerful AI interview engine</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">Real-time question generation, customizable scoring criteria, and keyword-based evaluation — all powered by AI trained on thousands of interviews.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Auto-scoring", "Keyword matching", "Min word count", "Category tags"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle size={13} className="text-green-500 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#F1F5F9] shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                  <BarChart3 size={22} className="text-[#2563EB]" />
                </div>
                <h3 className="text-[#0F172A] text-xl font-bold font-syne mb-3">Streamlined candidate management</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">Track every candidate, session, and score in one organized dashboard. Generate reports, compare candidates, and make data-driven hiring decisions.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Session history", "Score reports", "Candidate compare", "Export results"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle size={13} className="text-green-500 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Four smaller feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <ClipboardList size={18} className="text-orange-500" />, bg: "bg-orange-50", title: "Custom Question Bank", desc: "Build your own library with categories and points." },
              { icon: <Shield size={18} className="text-[#0F172A]" />, bg: "bg-[#F8FAFC]", title: "Secure & Private", desc: "Encrypted data, only your team can access." },
              { icon: <Users size={18} className="text-green-600" />, bg: "bg-green-50", title: "Team Collaboration", desc: "Invite team members to review and score together." },
              { icon: <Crown size={18} className="text-yellow-500" />, bg: "bg-yellow-50", title: "Premium Analytics", desc: "Advanced insights and unlimited interviews." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-[#F1F5F9] hover:border-[#7C3AED]/30 hover:shadow-md transition-all">
                <div className={`w-9 h-9 ${f.bg} rounded-xl flex items-center justify-center mb-3`}>{f.icon}</div>
                <h4 className="text-[#0F172A] font-bold text-sm mb-1.5 font-syne">{f.title}</h4>
                <p className="text-[#64748B] text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (pricing-2) ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-[#7C3AED] text-sm font-semibold mb-3">Pricing</p>
            <h2 className="text-[#0F172A] text-4xl font-extrabold font-syne mb-4">Pricing that scales with your business</h2>
            <p className="text-[#64748B] text-lg">Start free. Upgrade when you need more.</p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-12 mt-8">
            <span className="text-sm font-medium text-[#0F172A]">Monthly</span>
            <div className="w-12 h-6 bg-[#7C3AED] rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="text-sm font-medium text-[#0F172A]">Annual</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Save 25%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Free */}
            <div className="bg-white rounded-2xl p-6 border border-[#F1F5F9] shadow-sm">
              <p className="text-[#64748B] text-sm font-medium mb-1">Free</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-[#0F172A] font-syne">$0</span>
                <span className="text-[#94A3B8] text-sm">/mo</span>
              </div>
              <p className="text-[#94A3B8] text-xs mb-6">Forever free, no credit card</p>
              <Link href="/sign-up" className="block w-full text-center py-2.5 rounded-xl border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors mb-6">
                Get Started
              </Link>
              <div className="space-y-2.5">
                {["5 interviews/month", "AI question generation", "Basic scoring", "Email support"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                    <CheckCircle size={13} className="text-green-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pro — highlighted */}
            <div className="bg-[#0F172A] rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-4 right-4 bg-[#7C3AED] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">POPULAR</div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#7C3AED]/20 rounded-full translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <p className="text-white/60 text-sm font-medium mb-1">Pro</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-white font-syne">2,000</span>
                  <span className="text-white/40 text-sm">RWF/mo</span>
                </div>
                <p className="text-white/40 text-xs mb-6">Billed monthly</p>
                <Link href="/payment" className="block w-full text-center py-2.5 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm hover:bg-[#6D28D9] transition-colors mb-6">
                  Upgrade Now
                </Link>
                <div className="space-y-2.5">
                  {["Everything in Free", "Unlimited interviews", "Advanced AI scoring", "Analytics dashboard", "Priority support"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle size={13} className="text-[#A78BFA] shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Startup */}
            <div className="bg-white rounded-2xl p-6 border border-[#F1F5F9] shadow-sm">
              <p className="text-[#64748B] text-sm font-medium mb-1">Startup</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-[#0F172A] font-syne">15,000</span>
                <span className="text-[#94A3B8] text-sm">RWF/yr</span>
              </div>
              <p className="text-[#94A3B8] text-xs mb-6">Save 9,000 RWF vs monthly</p>
              <Link href="/payment" className="block w-full text-center py-2.5 rounded-xl border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors mb-6">
                Get Yearly
              </Link>
              <div className="space-y-2.5">
                {["Everything in Pro", "Yearly billing discount", "Custom question bank", "Team collaboration", "Dedicated support"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#475569]">
                    <CheckCircle size={13} className="text-green-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
