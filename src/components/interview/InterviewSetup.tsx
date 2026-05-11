"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface InterviewSetupProps {
  onStart: (candidateName: string, roleTitle: string) => void;
}

export default function InterviewSetup({ onStart }: InterviewSetupProps) {
  const [candidateName, setCandidateName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");

  const canStart = candidateName.trim().length > 1 && roleTitle.trim().length > 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canStart) onStart(candidateName.trim(), roleTitle.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF] flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-grid-blue" />

      {/* Back to Dashboard */}
      <div className="absolute top-5 left-5 z-20">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-[#64748B] text-xs hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft size={13} /> Back to Dashboard
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-[460px] relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2563EB] shadow-lg mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-[#0F172A] text-2xl font-extrabold mb-1.5 font-syne">
            HireMind Interview
          </h1>
          <p className="text-[#64748B] text-sm">
            Answer structured questions and receive instant scoring
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl p-7 shadow-[0_8px_32px_rgba(37,99,235,0.12)] border border-[#E8EDF5] space-y-5">
            <div>
              <label htmlFor="candidateName" className="block text-[#0F172A] text-sm font-semibold mb-1.5">
                Your Name
              </label>
              <input
                id="candidateName"
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#94A3B8]"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="roleTitle" className="block text-[#0F172A] text-sm font-semibold mb-1.5">
                Role Applied For
              </label>
              <input
                id="roleTitle"
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Product Manager"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#94A3B8]"
              />
            </div>

            <button
              type="submit"
              disabled={!canStart}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                canStart
                  ? "bg-[#2563EB] text-white hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.35)] active:scale-[0.98]"
                  : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
              }`}
            >
              Begin Interview →
            </button>
          </div>
        </form>

        <p className="text-center text-[#94A3B8] text-xs mt-5">
          Your answers will be automatically scored based on relevance and depth.
        </p>
      </motion.div>
    </div>
  );
}
