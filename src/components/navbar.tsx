import Link from 'next/link'
import { createClient } from '../../supabase/server'
import UserProfile from './user-profile'

export default async function Navbar() {
  const supabase = createClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  return (
    <nav className="w-full bg-[#0F2B5B] border-b border-[#1a3a73]">
      <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#7C3AED] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <span className="text-white font-black text-lg font-jakarta tracking-tight">HireMind AI</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/interview"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1d53d4] shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all"
              >
                Start Interview
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
              >
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
      </div>
    </nav>
  )
}
