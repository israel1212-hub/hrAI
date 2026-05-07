import Link from "next/link";
import { createClient } from "../../supabase/server";
import { ArrowUpRight } from "lucide-react";

export default async function MarketingNav() {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Logo + Nav links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm font-syne">HireMind AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link href="#features" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              How it works
            </Link>
            <Link href="/payment" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              Pricing
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
              >
                Dashboard <ArrowUpRight size={14} />
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="px-4 py-2 border border-white/30 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all">
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
              >
                Sign Up <ArrowUpRight size={14} />
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
