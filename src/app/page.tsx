import Link from "next/link";
import { Zap } from "lucide-react";
import MarketingNav from "@/components/marketing-nav";
import Footer from "@/components/footer";

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

              {/* Stat 1 — top left */}
              <div className="bg-white rounded-3xl p-6 border border-[#F1F5F9] shadow-sm flex flex-col justify-center">
                <p className="text-[#0F172A] text-4xl font-black tracking-tight font-jakarta">12k+</p>
                <p className="text-[#94A3B8] text-sm mt-1">Candidates screened</p>
              </div>

              {/* Stat 2 — top right */}
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

      <Footer />
    </div>
  );
}
