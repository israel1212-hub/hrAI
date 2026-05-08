import Link from "next/link";
import MarketingNav from "@/components/marketing-nav";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden min-h-screen">
      <MarketingNav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh]">

            {/* ── LEFT ─────────────────────────────────────────────────── */}
            <div className="flex flex-col justify-center">

              {/* Headline */}
              <h1 className="text-[#0F172A] text-5xl sm:text-6xl font-black leading-[1.08] mb-5 tracking-tight font-jakarta">
                Welcome to the{" "}
                <span className="italic font-light text-[#7C3AED]">smart</span>
                <br />
                <span className="italic font-light text-[#7C3AED]">hiring</span>{" "}
                platform
              </h1>

              {/* Subtext */}
              <p className="text-[#64748B] text-base leading-relaxed mb-8 max-w-[420px]">
                Generate interview questions, score candidates automatically, and make confident hiring decisions — all in one place.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap mb-8">
                <Link
                  href="/sign-up"
                  className="px-7 py-3.5 bg-[#7C3AED] text-white rounded-xl font-semibold text-sm hover:bg-[#6D28D9] transition-all shadow-[0_4px_14px_rgba(124,58,237,0.35)]"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/sign-in"
                  className="px-7 py-3.5 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl font-semibold text-sm hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
                >
                  Sign In →
                </Link>
              </div>

              {/* Trusted by logos */}
              <div>
                <p className="text-[#94A3B8] text-xs mb-3 uppercase tracking-widest">Used by teams at</p>
                <div className="flex items-center gap-5 flex-wrap">
                  {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((b) => (
                    <span key={b} className="text-[#CBD5E1] text-sm font-bold hover:text-[#94A3B8] transition-colors">{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT — Image + floating cards ───────────────────────── */}
            <div className="relative h-[560px] hidden lg:block">

              {/* Background image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=80"
                  alt="Abstract neural pattern"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/20 to-transparent" />
              </div>

              {/* Stat card 1 — top left */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#F1F5F9] shadow-xl w-44">
                <p className="text-[#0F172A] text-3xl font-black tracking-tight font-jakarta">12k+</p>
                <p className="text-[#94A3B8] text-xs mt-1">Candidates screened</p>
                <div className="mt-2 h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-[#7C3AED] rounded-full" />
                </div>
              </div>

              {/* Stat card 2 — middle right */}
              <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#F1F5F9] shadow-xl w-44">
                <p className="text-[#0F172A] text-3xl font-black tracking-tight font-jakarta">94%</p>
                <p className="text-[#94A3B8] text-xs mt-1">Scoring accuracy</p>
                <div className="flex items-center mt-3">
                  {["A","B","C","D"].map((l, i) => (
                    <div
                      key={l}
                      className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold"
                      style={{ marginLeft: i === 0 ? 0 : -6, zIndex: 4 - i, backgroundColor: ["#7C3AED","#4F6EF7","#2563EB","#A78BFA"][i] }}
                    >
                      {l}
                    </div>
                  ))}
                  <span className="text-[#64748B] text-[9px] ml-1.5">+80k</span>
                </div>
              </div>

              {/* Stat card 3 — bottom left */}
              <div className="absolute bottom-6 left-6 bg-[#7C3AED] backdrop-blur-md rounded-2xl p-5 shadow-xl w-44">
                <p className="text-white text-3xl font-black tracking-tight font-jakarta">3.2k</p>
                <p className="text-white/70 text-xs mt-1">Hires made this month</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/70 text-[9px]">+18% vs last month</span>
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
