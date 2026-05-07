import Link from "next/link";
import MarketingNav from "@/components/marketing-nav";
import Footer from "@/components/footer";
import { FileText, MoreVertical, ArrowUpRight, TrendingUp } from "lucide-react";

const candidates = [
  { name: "Priya Sharma", role: "Product Designer", score: 94, label: "Excellent", avatar: "PS" },
  { name: "Arjun Mehta", role: "Frontend Developer", score: 89, label: "Excellent", avatar: "AM" },
  { name: "Neha Verma", role: "Marketing Manager", score: 86, label: "Very Good", avatar: "NV" },
];

function ScoreRing({ score }: { score: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#E2E8F0" strokeWidth="3" />
      <circle cx="22" cy="22" r={r} fill="none" stroke="#7C3AED" strokeWidth="3"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 22 22)" />
      <text x="22" y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A">{score}%</text>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden min-h-screen">
      <MarketingNav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-28 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

            {/* LEFT */}
            <div className="flex flex-col justify-center">
              <h1 className="text-[#0F172A] text-5xl sm:text-6xl font-black leading-[1.08] mb-6 tracking-tight font-jakarta">
                Welcome to the{" "}
                <span className="italic font-light text-[#7C3AED]">AI</span>
                <br />
                <span className="italic font-light text-[#7C3AED]">hiring</span>{" "}
                platform
              </h1>
              <p className="text-[#64748B] text-base leading-relaxed mb-8 max-w-[420px]">
                Generate interview questions, score candidates automatically, and make confident hiring decisions — all in one place.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/sign-up" className="px-6 py-3 bg-[#7C3AED] text-white rounded-xl font-semibold text-sm hover:bg-[#6D28D9] transition-all shadow-sm">
                  Get Started
                </Link>
                <Link href="/sign-in" className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all shadow-sm">
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* RIGHT — Dashboard mockup */}
            <div className="relative hidden lg:block">
              {/* Background gradient blob */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#E8F5E9] via-[#F3F0FF] to-[#EDE9FE] opacity-60" />
              {/* Network dots decoration */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#7C3AED]"
                    style={{ top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 13) % 90}%` }} />
                ))}
              </div>

              <div className="relative z-10 p-6 space-y-4">

                {/* Top stat card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F1F5F9] w-52">
                  <p className="text-[#0F172A] text-2xl font-black font-jakarta">12k+</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">Candidates screened</p>
                  <div className="mt-3 flex items-center justify-between">
                    <svg width="80" height="24" viewBox="0 0 80 24">
                      <polyline points="0,18 15,14 30,16 45,10 60,12 75,6" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="w-6 h-6 rounded-full border-2 border-[#7C3AED] flex items-center justify-center">
                      <ArrowUpRight size={10} className="text-[#7C3AED]" />
                    </div>
                  </div>
                </div>

                {/* Main candidates card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F1F5F9]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#0F172A] text-sm font-bold">Top Candidates</span>
                    <div className="flex items-center gap-1 text-xs text-[#64748B] border border-[#E2E8F0] rounded-lg px-2 py-1">
                      AI Match Score <span className="ml-1">▾</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {candidates.map((c) => (
                      <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAFC]">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {c.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#0F172A] text-xs font-semibold truncate">{c.name}</p>
                          <p className="text-[#94A3B8] text-[10px]">{c.role}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <ScoreRing score={c.score} />
                          <span className="text-green-600 text-[10px] font-semibold">{c.label}</span>
                          <MoreVertical size={12} className="text-[#94A3B8]" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="mt-4 w-full text-center text-[#7C3AED] text-xs font-semibold hover:underline flex items-center justify-center gap-1">
                    View all candidates <ArrowUpRight size={11} />
                  </button>
                </div>

                {/* Bottom right cards */}
                <div className="flex gap-3">
                  {/* 94% card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F1F5F9] flex-1">
                    <p className="text-[#0F172A] text-2xl font-black font-jakarta">94%</p>
                    <p className="text-[#94A3B8] text-xs mt-0.5">Scoring accuracy</p>
                    <div className="flex items-center mt-2">
                      {["A","B","C","D","E"].map((l, i) => (
                        <div key={l} className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-white text-[7px] font-bold"
                          style={{ marginLeft: i === 0 ? 0 : -4, zIndex: 5 - i, backgroundColor: ["#7C3AED","#4F6EF7","#2563EB","#7C3AED","#A78BFA"][i] }}>
                          {l}
                        </div>
                      ))}
                      <span className="text-[#64748B] text-[9px] ml-1.5">+80k users</span>
                    </div>
                  </div>

                  {/* Interview Questions card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F1F5F9] flex-1">
                    <p className="text-[#0F172A] text-xs font-bold mb-0.5">Interview</p>
                    <p className="text-[#0F172A] text-xs font-bold">Questions</p>
                    <p className="text-[#94A3B8] text-[10px] mt-1">Generated by AI</p>
                    <div className="mt-3 w-8 h-8 rounded-xl bg-[#F3F0FF] flex items-center justify-center">
                      <FileText size={14} className="text-[#7C3AED]" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
