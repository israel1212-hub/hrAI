'use client'

import Link from 'next/link'
import { createClient } from '../../supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardNavbar() {
  const supabase = createClient()
  const router = useRouter()

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
          <span className="text-white font-bold text-lg font-syne">HireMind</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-3">
          <Link
            href="/interview"
            className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
          >
            Start Interview
          </Link>
          <Link
            href="/interview/admin"
            className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors"
          >
            Admin Panel
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Account menu"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1a3a73] hover:bg-[#243f7a] transition-colors"
              >
                <UserCircle className="h-5 w-5 text-[#94A3B8]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/')
                }}
                className="cursor-pointer text-red-500 focus:text-red-500"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
