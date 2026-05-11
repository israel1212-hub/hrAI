"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface InterviewHeaderProps {
  roleTitle: string;
  candidateName: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function InterviewHeader({
  roleTitle,
  candidateName,
  currentQuestion,
  totalQuestions,
}: InterviewHeaderProps) {
  const progress = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] border-b border-[#1E293B]">
      <div className="max-w-[680px] mx-auto px-5 py-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </Link>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">{roleTitle}</p>
              <p className="text-[#64748B] text-xs">{candidateName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-[#64748B] text-xs hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> Dashboard
            </Link>
            <span className="text-[#94A3B8] text-sm">
              Question{" "}
              <span className="text-[#2563EB] font-bold">{currentQuestion}</span>
              <span className="text-[#475569]"> / {totalQuestions}</span>
            </span>
          </div>
        </div>
        <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2563EB] rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </header>
  );
}
