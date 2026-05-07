import Link from "next/link";
import { Brain, Zap } from "lucide-react";
import MarketingNav from "@/components/marketing-nav";

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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#64748B] mb-8 w-fit shadow-sm">
                <Zap size={10} className="text-[#7C3AED]" />
                2.0 version is here
              </div>
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
                <Link href="/sign-up" className="px-6 py-3 bg-[#0F172A] text-white rounded-xl font-semibold text-sm hover:bg-[#1E293B] transition-all shadow-sm">
                  Get Started
                </Link>
                <Link href="/sign-in" className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all shadow-sm">
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* RIGHT — Cards */}
            <div className="grid grid-cols-2 gap-4 h-[480px]">
              {/* Tall left card */}
              <div className="row-span-2 bg-[#F3F0FF] rounded-3xl border border-[#EDE9FE] flex items-center justify-center p-6">
                <div className="w-full max-w-[180px] bg-white rounded-2xl shadow-lg border border-[#F1F5F9] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                      <Brain size={13} className="text-white" />
                    </div>
                    <span className="text-[#0F172A] text-xs font-bold">Interview</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2 bg-[#F1F5F9] rounded-full w-full" />
                    <div className="h-2 bg-[#F1F5F9] rounded-full w-4/5" />
                    <div className="h-2 bg-[#F1F5F9] rounded-full w-3/5" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#94A3B8] text-[10px]">Score</span>
                    <span className="text-[#7C3AED] text-base font-extrabold">87/100</span>
                  </div>
                  <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mb-4">
                    <div className="h-full w-[87%] bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] rounded-full" />
                  </div>
                  <div className="w-full py-2 bg-[#7C3AED] rounded-xl text-center">
                    <span className="text-white text-[10px] font-bold tracking-wide">✓ HIRE</span>
                  </div>
                </div>
              </div>

              {/* Stat 1 */}
              <div className="bg-white rounded-3xl p-6 border border-[#F1F5F9] shadow-sm flex flex-col justify-center">
                <p className="text-[#0F172A] text-4xl font-black tracking-tight font-jakarta">12k+</p>
                <p className="text-[#94A3B8] text-sm mt-1">Candidates screened</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-3xl p-6 border border-[#F1F5F9] shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-[#0F172A] text-4xl font-black tracking-tight font-jakarta">94%</p>
                  <p className="text-[#94A3B8] text-sm mt-1">Scoring accuracy</p>
                </div>
                <div className="flex items-center mt-4">
                  {["A","B","C","D","E"].map((l, i) => (
                    <div
                      key={l}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold"
                      style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 5 - i, backgroundColor: ["#7C3AED","#4F6EF7","#2563EB","#7C3AED","#A78BFA"][i] }}
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
      </section>
    </div>
  );
}
