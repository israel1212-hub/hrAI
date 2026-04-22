import { ArrowRight, CheckCircle2, Zap, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div
      className="min-h-screen bg-[#F5F7FA] relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0F2B5B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 max-w-[900px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0F2B5B] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-[#0F2B5B] font-bold text-lg">InterviewAI</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/interview/admin"
                className="text-[#64748B] hover:text-[#0F2B5B] text-sm font-medium transition-colors"
              >
                Admin Panel
              </Link>
              <Link
                href="/interview"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all"
              >
                Start Interview
                <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-[#64748B] hover:text-[#0F2B5B] text-sm font-medium transition-colors">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-[680px] mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEF4FF] text-[#2563EB] rounded-full text-sm font-semibold mb-8 border border-[#BFDBFE]">
          <Zap size={13} />
          AI-Powered Text Interviews
        </div>

        <h1
          className="text-[#0F2B5B] text-5xl sm:text-6xl font-extrabold leading-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Hire Better,{" "}
          <span className="text-[#2563EB]">Think Faster</span>
        </h1>

        <p className="text-[#64748B] text-lg leading-relaxed mb-10 max-w-[520px] mx-auto">
          A structured, text-based interview platform that automatically scores candidate responses — so you can focus on the signals that matter.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/interview"
            className="flex items-center gap-2 px-7 py-4 bg-[#2563EB] text-white rounded-xl text-[15px] font-semibold hover:bg-[#1d53d4] shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.5)] active:scale-[0.98] transition-all"
          >
            Take the Interview
            <ArrowRight size={16} />
          </Link>
          {user ? (
            <Link
              href="/interview/admin"
              className="flex items-center gap-2 px-7 py-4 bg-white text-[#0F2B5B] rounded-xl text-[15px] font-semibold border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC] transition-all shadow-sm"
            >
              Question Builder
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className="flex items-center gap-2 px-7 py-4 bg-white text-[#0F2B5B] rounded-xl text-[15px] font-semibold border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC] transition-all shadow-sm"
            >
              Create Free Account
            </Link>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 max-w-[900px] mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: <BarChart3 size={20} />,
              title: "Auto-Scoring",
              description: "Keyword-based scoring engine evaluates every response instantly on a 0–10 scale.",
            },
            {
              icon: <CheckCircle2 size={20} />,
              title: "Structured Questions",
              description: "Build your question bank with categories, point weights, and scoring criteria.",
            },
            {
              icon: <Users size={20} />,
              title: "Results Export",
              description: "Download a clean summary report with scores, answers, and performance tiers.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-[#E8EDF5] shadow-sm hover:shadow-md hover:border-[#BFDBFE] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3
                className="text-[#0F2B5B] font-bold text-base mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-[680px] mx-auto px-6 pb-24">
        <div className="bg-[#0F2B5B] rounded-3xl p-10 text-center shadow-[0_16px_48px_rgba(15,43,91,0.2)] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05] rounded-3xl pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <h2
            className="text-[#F5F7FA] text-3xl font-extrabold mb-3 relative z-10"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready to streamline hiring?
          </h2>
          <p className="text-[#94A3B8] text-[15px] mb-7 relative z-10">
            Sign up free and start running structured text interviews today.
          </p>
          <Link
            href={user ? "/interview/admin" : "/sign-up"}
            className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white rounded-xl text-[15px] font-semibold hover:bg-[#1d53d4] shadow-[0_4px_16px_rgba(37,99,235,0.5)] transition-all"
          >
            {user ? "Open Admin Panel" : "Get Started Free"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
