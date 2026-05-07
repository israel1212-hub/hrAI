"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brain, Menu, X, ArrowUpRight } from "lucide-react";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[#F1F5F9] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
              <Brain size={14} className="text-white" />
            </div>
            <span className={`font-bold text-sm font-syne transition-colors ${scrolled ? "text-[#0F172A]" : "text-white"}`}>
              HireMind AI
            </span>
          </Link>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/sign-in"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[#64748B] hover:text-[#0F172A]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                scrolled
                  ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-sm"
                  : "bg-white text-[#0F172A] hover:bg-white/90"
              }`}
            >
              Get Started <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-[#0F172A] hover:bg-[#F8FAFC]" : "text-white hover:bg-white/10"
            }`}
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
