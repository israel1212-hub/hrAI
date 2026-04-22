"use client";

import { motion } from "framer-motion";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F2B5B] border-b border-[#1a3a73]">
      <div className="max-w-[680px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[#F5F7FA] font-semibold text-sm leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {roleTitle}
              </p>
              <p className="text-[#64748B] text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {candidateName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[#F5F7FA] text-sm font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Question{" "}
              <span className="text-[#2563EB] font-bold">{currentQuestion}</span>
              <span className="text-[#64748B]"> of {totalQuestions}</span>
            </span>
          </div>
        </div>
        <div className="w-full h-1 bg-[#1a3a73] rounded-full overflow-hidden">
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
