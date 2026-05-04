import Link from "next/link";
import {
  ArrowRight,
  Settings,
  BarChart3,
  MessageSquare,
  Zap,
  BookOpen,
  Users,
  CheckCircle,
} from "lucide-react";
import Footer from "@/components/footer";
import MarketingNav from "@/components/marketing-nav";
import AccordionSection from "@/components/accordion-section";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      <MarketingNav />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-grid-blue" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-14">
          {/* Left */}
          <div className="flex-1 max-w-[520px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EEF4FF] text-[#2563EB] rounded-full text-xs font-semibold mb-6 border border-[#BFDBFE]">
              <Zap size={11} /> AI-Powered Text Interviews
            </div>
            <h1 className="text-[#0F172A] text-5xl sm:text-6xl font-extrabold leading-[1.1] mb-5 font-syne">
              Hire smarter,{" "}
              <span className="text-[#2563EB]">interview</span>{" "}
              any candidate
            </h1>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              A structured, text-based interview platform that automatically scores candidate responses — so you can focus on the signals that matter.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/interview" className="flex items-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all">
                Get started free <ArrowRight size={15} />
              </Link>
              <Link href="/sign-up" className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#0F172A] rounded-xl text-sm font-semibold border border-[#E2E8F0] hover:border-[#2563EB] transition-all shadow-sm">
                Create free account
              </Link>
            </div>
          </div>

          {/* Right — UI mockup card */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-[320px] sm:w-[400px]">
              <div className="bg-white rounded-3xl shadow-[0_24px_64px_rgba(37,99,235,0.18)] p-5 border border-[#E8EDF5]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#0F172A] font-bold text-sm font-syne">Interview Session</p>
                    <p className="text-[#94A3B8] text-xs">Live scoring</p>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 mb-3 border border-[#E8EDF5]">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF4FF] text-[#2563EB] uppercase tracking-wider mb-2">Leadership</span>
                  <p className="text-[#0F172A] font-bold text-sm font-syne leading-snug">Describe a time you led a team through a difficult challenge.</p>
                </div>
                <div className="bg-[#F1F5F9] rounded-lg h-9 mb-3 flex items-center px-3">
                  <div className="w-2/3 h-1.5 bg-[#CBD5E1] rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[8, 7, 9].map((s, i) => (
                      <div key={i} className="w-7 h-7 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] font-bold text-xs">{s}</div>
                    ))}
                  </div>
                  <div className="px-2.5 py-1 bg-[#2563EB] text-white rounded-lg text-xs font-bold">24/30</div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-[#2563EB] text-white rounded-xl px-3 py-1.5 shadow-lg text-xs font-bold">✓ Auto-scored</div>
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-[#E8EDF5]">
                <p className="text-[#0F172A] font-extrabold text-base font-syne">98%</p>
                <p className="text-[#64748B] text-xs">Accuracy rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ──────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#F1F5F9]">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-center text-[#94A3B8] text-xs font-semibold uppercase tracking-widest mb-8">Trusted by leading hiring teams</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {["Acme Corp", "Globex", "Initech", "Umbrella", "Hooli", "Pied Piper"].map((name) => (
              <div key={name} className="flex items-center justify-center h-12 rounded-xl border border-[#E8EDF5] bg-[#F8FAFC] hover:border-[#BFDBFE] transition-colors">
                <span className="text-[#2563EB] font-bold text-xs">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ───────────────────────────────────────────────────────── */}
      <section id="solutions" className="py-20 bg-[#F8FAFF]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-14">
          {/* Phone mockups */}
          <div className="flex-1 flex gap-4 justify-center">
            <div className="w-[150px] bg-white rounded-[24px] shadow-[0_16px_48px_rgba(37,99,235,0.15)] border border-[#E8EDF5] p-4 mt-8">
              <p className="text-[10px] text-[#94A3B8] mb-2">9:41</p>
              <p className="text-[#0F172A] font-bold text-xs mb-2 font-syne">Your Results</p>
              <div className="w-full h-16 rounded-xl bg-gradient-to-br from-[#FDE68A] to-[#F59E0B] mb-2" />
              <p className="text-[#0F172A] font-bold text-[10px] mb-1 font-syne">Score Summary</p>
              <p className="text-[#94A3B8] text-[9px] leading-tight">Detailed breakdown of your interview performance</p>
            </div>
            <div className="w-[150px] bg-white rounded-[24px] shadow-[0_16px_48px_rgba(37,99,235,0.15)] border border-[#E8EDF5] p-4">
              <p className="text-[10px] text-[#94A3B8] mb-2">9:41</p>
              <p className="text-[#0F172A] font-bold text-xs mb-2 font-syne">Dashboard</p>
              <div className="flex gap-1.5 mb-2">
                <div className="flex-1 bg-[#EEF4FF] rounded-lg p-1.5">
                  <p className="text-[#2563EB] font-extrabold text-sm font-syne">24</p>
                  <p className="text-[#94A3B8] text-[8px]">Sessions</p>
                </div>
                <div className="flex-1 bg-[#FFF3E0] rounded-lg p-1.5">
                  <p className="text-[#F59E0B] font-extrabold text-sm font-syne">91%</p>
                  <p className="text-[#94A3B8] text-[8px]">Avg score</p>
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-12">
                {[3, 5, 4, 7, 6, 8, 9, 10, 8, 11].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 4}px`, backgroundColor: i >= 7 ? "#F59E0B" : "#E8EDF5" }} />
                ))}
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="flex-1 max-w-[460px]">
            <h2 className="text-[#0F172A] text-4xl font-extrabold mb-4 font-syne">Our Solutions</h2>
            <p className="text-[#475569] text-[15px] leading-relaxed mb-3">
              Don&apos;t limit yourself to manual evaluation. Our AI-powered scoring engine evaluates every candidate response instantly — so you can fast-track your path to the right hire.
            </p>
            <p className="text-[#475569] text-[15px] leading-relaxed mb-7">
              Your hiring journey is as unique as your team. We&apos;re ready to remove any obstacles along the way.
            </p>
            <Link href="/interview" className="inline-flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all">
              Start interviewing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GROW BANNER ─────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-[#4F6EF7] rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute left-6 bottom-0 w-20 h-28 bg-[#6B84F8] rounded-t-full opacity-60" />
            <div className="absolute right-12 bottom-0 w-14 h-20 bg-[#6B84F8] rounded-t-full opacity-40" />
            <div className="absolute right-3 bottom-0 w-9 h-14 bg-[#7B92F9] rounded-t-full opacity-30" />
            <p className="relative z-10 text-white text-2xl sm:text-3xl font-extrabold font-syne leading-snug">
              We are here to help you<br />grow your hiring pipeline
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ───────────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-[#F8FAFF]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[#0F172A] text-4xl font-extrabold text-center mb-3 font-syne">Speedy interview<br />experience creation.</h2>
          <p className="text-[#64748B] text-center text-sm mb-12 max-w-[440px] mx-auto">Everything you need to run structured, scored interviews at scale.</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: <BookOpen size={17} />, title: "Educational Insights", desc: "Our question bank is developed in collaboration with industry hiring leaders.", highlight: true },
              { icon: <BarChart3 size={17} />, title: "Interview Analytics", desc: "Get full information about candidate scores, word counts, and performance tiers.", highlight: false },
              { icon: <Users size={17} />, title: "Team Collaboration", desc: "Expand your hiring team and share interview results with your colleagues.", highlight: false },
            ].map((card) => (
              <div key={card.title} className={`rounded-2xl p-6 flex flex-col gap-3 transition-all ${card.highlight ? "bg-[#4F6EF7] shadow-[0_8px_32px_rgba(79,110,247,0.35)]" : "bg-white border border-[#E8EDF5] shadow-sm hover:shadow-md"}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.highlight ? "bg-white/20 text-white" : "bg-[#FFF3E0] text-[#F59E0B]"}`}>{card.icon}</div>
                <h3 className={`font-bold text-sm font-syne ${card.highlight ? "text-white" : "text-[#0F172A]"}`}>{card.title}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${card.highlight ? "text-blue-100" : "text-[#64748B]"}`}>{card.desc}</p>
                <Link href="/interview" className={`inline-flex items-center gap-1 text-sm font-semibold ${card.highlight ? "text-white" : "text-[#2563EB]"}`}>
                  Learn more <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES (accordion + mockup) ──────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col lg:flex-row items-start gap-14">
          <div className="flex-1 max-w-[460px]">
            <h2 className="text-[#0F172A] text-4xl font-extrabold mb-7 font-syne">Platform features</h2>
            <AccordionSection />
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              <div className="absolute inset-0 bg-[#4F6EF7] rounded-3xl translate-x-3 translate-y-3" />
              <div className="relative bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex">
                  <div className="w-[130px] bg-[#1E293B] p-4 border-r border-[#334155]">
                    <p className="text-[#94A3B8] text-[9px] font-bold uppercase tracking-widest mb-3">PLACE</p>
                    {["Design", "All Screens", "Neutral", "Settings"].map((item, i) => (
                      <p key={i} className="text-[#64748B] text-xs py-1.5 hover:text-white cursor-pointer transition-colors">{item}</p>
                    ))}
                  </div>
                  <div className="flex-1 p-4">
                    <p className="text-white font-bold text-sm font-syne mb-3">Interview Card</p>
                    <div className="w-full h-24 rounded-xl bg-gradient-to-br from-[#FDE68A] to-[#F59E0B] mb-3 flex items-center justify-center">
                      <div className="flex gap-2">{[0, 1, 2].map((i) => <div key={i} className="w-7 h-7 rounded-lg bg-white/30" />)}</div>
                    </div>
                    <p className="text-white font-bold text-xs font-syne mb-1">Interview Design Features</p>
                    <p className="text-[#64748B] text-[10px] leading-relaxed">HireMind AI is equipped with the tools you need to run your ultimate hiring process.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#F8FAFF]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-[#4F6EF7] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-28 h-28 bg-[#6B84F8] rounded-full opacity-50 blur-xl" />
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-28 h-28 bg-[#6B84F8] rounded-full opacity-50 blur-xl" />
            <h2 className="relative z-10 text-white text-3xl font-extrabold font-syne mb-7">Act now, using our<br />opportunities</h2>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[460px] mx-auto">
              <input type="email" placeholder="Enter your email address"
                className="flex-1 w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-blue-200 text-sm focus:outline-none focus:border-white/60" />
              <Link href="/sign-up" className="flex items-center gap-2 px-5 py-3 bg-white text-[#4F6EF7] rounded-xl text-sm font-bold hover:bg-blue-50 transition-all whitespace-nowrap shadow-lg">
                Get started free <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
