import Link from "next/link";
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

            {/* RIGHT — Abstract image + floating stat cards */}
            <div className="relative h-[480px] hidden lg:block">

              {/* Abstract flowing light image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img
                  src="https://raw.githubusercontent.com/tailark/assets/refs/heads/main/clouds_blcfda.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: "hue-rotate(200deg) saturate(1.4) brightness(0.85)" }}
                />
                {/* Subtle white fade on left edge to blend with white bg */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
              </div>

              {/* Stat card 1 — top left, floating */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-lg w-44">
                <p className="text-[#0F172A] text-3xl font-black tracking-tight font-jakarta">12k+</p>
                <p className="text-[#94A3B8] text-xs mt-1">Candidates screened</p>
              </div>

              {/* Stat card 2 — bottom right, floating */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-lg w-48">
                <p className="text-[#0F172A] text-3xl font-black tracking-tight font-jakarta">94%</p>
                <p className="text-[#94A3B8] text-xs mt-1">Scoring accuracy</p>
                <div className="flex items-center mt-3">
                  {["A","B","C","D","E"].map((l, i) => (
                    <div
                      key={l}
                      className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold"
                      style={{ marginLeft: i === 0 ? 0 : -6, zIndex: 5 - i, backgroundColor: ["#7C3AED","#4F6EF7","#2563EB","#7C3AED","#A78BFA"][i] }}
                    >
                      {l}
                    </div>
                  ))}
                  <span className="text-[#64748B] text-[9px] ml-1.5">+80k users</span>
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
