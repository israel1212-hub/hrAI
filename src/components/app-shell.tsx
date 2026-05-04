"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  UserCircle,
} from "lucide-react";
import { createClient } from "../../supabase/client";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/interview", icon: ClipboardList, label: "Interviews" },
  { href: "/interview/admin", icon: Settings, label: "Question Builder" },
  { href: "/payment", icon: CreditCard, label: "Billing" },
];

// Each tab maps to a route
const TABS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Sessions", href: "/interview" },
  { label: "Questions", href: "/interview/admin" },
  { label: "Billing", href: "/payment" },
  { label: "Settings", href: "/dashboard/reset-password" },
];

interface AppShellProps {
  children: React.ReactNode;
  userEmail?: string;
  rightPanel?: React.ReactNode;
}

export default function AppShell({
  children,
  userEmail,
  rightPanel,
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#EEEAF8] flex items-center justify-center p-3 sm:p-5">
      {/* Outer card — the whole app lives inside this */}
      <div className="w-full max-w-[1280px] bg-white rounded-3xl shadow-[0_24px_80px_rgba(100,60,200,0.14)] overflow-hidden flex flex-col" style={{ minHeight: "calc(100vh - 40px)" }}>

        {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-[#F1F5F9] shrink-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7C3AED] flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[#0F172A] font-bold text-sm font-syne">InterviewAI</span>
          </Link>

          {/* Tab bar — derived from pathname, no prop needed */}
          <div className="hidden md:flex items-center gap-1 bg-[#F8FAFC] rounded-xl p-1">
            {TABS.map((tab) => {
              const isActive = pathname === tab.href || (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-sm"
                      : "text-[#64748B] hover:text-[#0F172A] hover:bg-white"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {/* User avatar */}
          <button
            type="button"
            onClick={handleSignOut}
            title="Sign out"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity"
          >
            {userEmail ? userEmail[0].toUpperCase() : <UserCircle size={16} />}
          </button>
        </header>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
          <aside className="w-[180px] shrink-0 border-r border-[#F1F5F9] flex flex-col py-4 px-3 gap-1">
            {NAV.map(({ href, icon: Icon, label }) => {
              const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#F3F0FF] text-[#7C3AED] font-semibold"
                      : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                  }`}
                >
                  <Icon size={16} className={active ? "text-[#7C3AED]" : "text-[#94A3B8]"} />
                  {label}
                </Link>
              );
            })}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Collapse / search area */}
            <div className="mt-2 pt-3 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] text-[#94A3B8] text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                Search…
              </div>
            </div>

            {/* Sign out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-[#EF4444] hover:bg-red-50 transition-all mt-1"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </aside>

          {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
          <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-5 flex gap-4">
            {/* Center content */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {children}
            </div>

            {/* Right panel (optional) */}
            {rightPanel && (
              <div className="w-[240px] shrink-0 flex flex-col gap-4">
                {rightPanel}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
