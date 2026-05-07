"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "/payment" },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1200px] transition-all duration-300 rounded-2xl ${
          scrolled
            ? "bg-white/70 backdrop-blur-3xl border border-[#E2E8F0]/80 shadow-lg"
            : "bg-white/70 backdrop-blur-3xl border border-[#E2E8F0]/80 shadow-sm"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* Logo + nav links on the left */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-[#7C3AED] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                  <path d="M20 3v4"/><path d="M22 5h-4"/>
                  <path d="M4 17v2"/><path d="M5 18H3"/>
                </svg>
              </div>
              <span className="font-black text-sm font-jakarta text-[#0F172A] tracking-tight">
                HireMind AI
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-all shadow-sm"
            >
              Get Started <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="px-6 py-6 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-[#0F172A] font-medium hover:bg-[#F8FAFC] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-[#F1F5F9] mt-4 pt-4 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-[#64748B] font-medium hover:bg-[#F8FAFC] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-center hover:bg-[#6D28D9] transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
