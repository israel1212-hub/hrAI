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
                <p className="text-[#B8C8DC] text-xs mb-4 uppercase tracking-widest font-light">Used by teams at</p>
                <div className="flex items-center gap-7 flex-wrap">

                  {/* Stripe */}
                  <svg height="22" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 hover:opacity-50 transition-opacity">
                    <path d="M59.64 14.28c0-4.66-2.26-8.34-6.58-8.34-4.34 0-6.97 3.68-6.97 8.3 0 5.48 3.1 8.24 7.55 8.24 2.17 0 3.81-.49 5.05-1.18v-3.64c-1.24.62-2.66.97-4.47.97-1.77 0-3.33-.62-3.53-2.77h8.91c0-.24.04-.97.04-1.58zm-9-.97c0-2.06 1.26-2.92 2.4-2.92 1.11 0 2.3.86 2.3 2.92h-4.7zM41.1 5.94c-1.78 0-2.92.84-3.56 1.42l-.24-1.13h-3.99v21.26l4.53-.96.01-5.16c.66.48 1.63 1.16 3.24 1.16 3.27 0 6.25-2.63 6.25-8.43-.01-5.3-3.02-8.16-6.24-8.16zm-1.1 12.58c-1.08 0-1.71-.38-2.15-.85l-.02-6.72c.47-.53 1.12-.88 2.17-.88 1.66 0 2.81 1.86 2.81 4.21 0 2.41-1.13 4.24-2.81 4.24zM28.24 4.6l4.54-.97V0l-4.54.96V4.6zM28.24 6.23h4.54V22.1h-4.54V6.23zM23.6 7.53l-.28-1.3h-3.91V22.1h4.53v-10.7c1.07-1.4 2.88-1.14 3.44-.96V6.23c-.58-.2-2.7-.56-3.78 1.3zM14.5 2.67l-4.42.94-.02 14.46c0 2.67 2 4.64 4.67 4.64 1.48 0 2.56-.27 3.16-.6v-3.67c-.58.24-3.43 1.06-3.43-1.6V9.93h3.43V6.23h-3.43l.04-3.56zM4.1 10.08c0-.7.58-.97 1.53-.97 1.37 0 3.1.41 4.47 1.15V6.4C8.72 5.83 7.35 5.6 6 5.6 2.4 5.6 0 7.47 0 10.28c0 4.41 6.07 3.7 6.07 5.6 0 .83-.72 1.1-1.73 1.1-1.5 0-3.41-.62-4.92-1.44v3.93c1.67.72 3.36 1.02 4.92 1.02 3.72 0 6.27-1.84 6.27-4.68-.01-4.76-6.11-3.91-6.11-5.73z" fill="#B8C8DC"/>
                  </svg>

                  {/* Vercel */}
                  <svg height="18" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 hover:opacity-50 transition-opacity">
                    <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-18-18.99-18zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-18-18.99-18zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.88 5.11-10.2 13.2-10.2z" fill="#B8C8DC"/>
                  </svg>

                  {/* Notion */}
                  <svg height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 hover:opacity-50 transition-opacity">
                    <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" fill="#B8C8DC"/>
                    <path d="M61.35.227L6.017 4.313C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V18.64c0-2.21-.873-2.847-3.443-4.733L74.167 3.143C69.893.037 68.147-.357 61.35.227z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M61.35.227L6.017 4.313C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V18.64c0-2.21-.873-2.847-3.443-4.733L74.167 3.143C69.893.037 68.147-.357 61.35.227zM25.92 19.523c-5.247.353-6.437.433-9.417-1.99L8.927 11.4c-.777-.78-.39-1.753.97-1.947l53.553-3.887c4.467-.39 6.793 1.167 8.54 2.527l9.123 6.61c.39.197 1.36 1.36.193 1.36l-55.387 3.46zM19.803 88.3V30.367c0-2.53.777-3.7 3.103-3.893L85 22.78c2.14-.193 3.107 1.167 3.107 3.7V83.8c0 2.53-.39 4.67-3.883 4.863l-60.377 3.5c-3.493.193-4.043-1.167-4.043-3.863zm59.6-54.827c.387 1.75 0 3.5-1.75 3.7l-2.91.577v42.773c-2.527 1.36-4.853 2.137-6.797 2.137-3.107 0-3.883-.973-6.21-3.887l-19.03-29.94v28.967l6.02 1.363s0 3.5-4.857 3.5l-13.39.777c-.39-.78 0-2.723 1.357-3.11l3.497-.97V36.553L29.7 36.16c-.39-1.75.58-4.277 3.3-4.473l14.367-.967 19.8 30.327V29.2l-5.047-.58c-.39-2.143 1.163-3.7 3.103-3.89l13.18-.78z" fill="#B8C8DC"/>
                  </svg>

                  {/* Figma */}
                  <svg height="22" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 hover:opacity-50 transition-opacity">
                    <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#B8C8DC"/>
                    <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#B8C8DC"/>
                    <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#B8C8DC"/>
                    <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#B8C8DC"/>
                    <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#B8C8DC"/>
                  </svg>

                  {/* Linear */}
                  <svg height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 hover:opacity-50 transition-opacity">
                    <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228zM.00189135 46.8891c-.01764375.2833.08887 .5599.28957.7606L52.3503 99.7085c.2007.2007.4773.3072.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.779293 4.5932-.926915 6.9624zM4.21093 29.7054c-.16649.3738-.08169.8106.21106 1.1034L69.1911 95.7789c.2928.2928.7296.3776 1.1034.2111 1.7156-.7638 3.3765-1.6169 4.9765-2.5594.5588-.3257.6425-1.0935.1765-1.5595L6.28742 24.7289c-.46604-.4659-1.23382-.3822-1.55942.1765-.94254 1.6001-1.79562 3.2609-2.55947 4.9765-.00001 0-.00001 0 0 0zM12.6587 18.074c-.3701-.3701-.3701-.9702 0-1.3403C21.5628 7.79019 34.3018 2 48.5 2c27.8675 0 50.5 22.6325 50.5 50.5 0 14.1982-5.7902 27.0372-15.1337 35.8413-.3701.3701-.9702.3701-1.3403 0L12.6587 18.074z" fill="#B8C8DC"/>
                  </svg>

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
