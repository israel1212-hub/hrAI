import Link from "next/link";
import { createClient } from "../../supabase/server";

export default async function MarketingNav() {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8EDF5]">
      <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-[#0F172A] font-bold text-base font-syne">InterviewAI</span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="#solutions" className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors">Solutions</Link>
          <Link href="#features" className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors">How it works</Link>
          <Link href="/payment" className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors">Pricing</Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/interview" className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_4px_12px_rgba(37,99,235,0.25)] transition-all">
                Start Interview
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors">
                Sign in
              </Link>
              <Link href="/sign-up" className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_4px_12px_rgba(37,99,235,0.25)] transition-all">
                Book a demo
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
