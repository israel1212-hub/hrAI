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
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg font-syne">InterviewAI</span>
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
