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

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 max-w-[800px] mx-auto">
          <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 font-syne tracking-tight">
            Your AI Hiring Partner,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]">
              Always On
            </span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-[520px]">
            Generate interview questions, score candidates automatically, and make confident hiring decisions — all in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/sign-up" className="flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#0F172A] rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow-lg">
              <Brain size={16} className="text-[#7C3AED]" /> Start Hiring Free
            </Link>
            <Link href="#how-it-works" className="flex items-center gap-2.5 px-6 py-3.5 bg-white/10 border border-white/30 backdrop-blur-sm text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all">
              See how it works <ArrowRight size={15} />
            </Link>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
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
