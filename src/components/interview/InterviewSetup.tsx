"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface InterviewSetupProps {
  onStart: (candidateName: string, roleTitle: string) => void;
}

export default function InterviewSetup({ onStart }: InterviewSetupProps) {
  const [candidateName, setCandidateName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");

  const canStart = candidateName.trim().length > 1 && roleTitle.trim().length > 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canStart) {
      onStart(candidateName.trim(), roleTitle.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-20">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0F2B5B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[500px] relative z-10"
      >
        {/* Logo mark */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0F2B5B] shadow-lg mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1
            className="text-[#0F2B5B] text-3xl font-extrabold mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Text Interview
          </h1>
          <p
            className="text-[#64748B] text-[15px]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Answer structured questions and receive instant scoring
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(15,43,91,0.08)] border border-[#E8EDF5] space-y-6">
            <div>
              <label
                htmlFor="candidateName"
                className="block text-[#0F2B5B] text-sm font-semibold mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Your Name
              </label>
              <input
                id="candidateName"
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-[15px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#94A3B8]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="roleTitle"
                className="block text-[#0F2B5B] text-sm font-semibold mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Role Applied For
              </label>
              <input
                id="roleTitle"
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Product Manager"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-[15px] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#94A3B8]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
            </div>

            <button
              type="submit"
              disabled={!canStart}
              className={`w-full py-4 rounded-xl font-semibold text-[15px] transition-all duration-200 ${
                canStart
                  ? "bg-[#2563EB] text-white hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] active:scale-[0.98]"
                  : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Begin Interview →
            </button>
          </div>
        </form>

        <p
          className="text-center text-[#94A3B8] text-xs mt-6"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Your answers will be automatically scored based on relevance and depth.
        </p>
      </motion.div>
    </div>
  );
}
