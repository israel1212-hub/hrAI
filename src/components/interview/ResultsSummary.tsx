"use client";

import { motion } from "framer-motion";
import { getPerformanceTier, getScoreColor } from "@/types/interview";
import type { AnswerWithQuestion } from "@/types/interview";
import { useState } from "react";

interface ResultsSummaryProps {
  answers: AnswerWithQuestion[];
  totalScore: number;
  maxScore: number;
  candidateName: string;
  roleTitle: string;
  onNewInterview: () => void;
}

export default function ResultsSummary({
  answers,
  totalScore,
  maxScore,
  candidateName,
  roleTitle,
  onNewInterview,
}: ResultsSummaryProps) {
  const [copied, setCopied] = useState(false);
  const tier = getPerformanceTier(totalScore, maxScore);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const generateSummaryText = () => {
    const lines = [
      `Interview Summary — ${roleTitle}`,
      `Candidate: ${candidateName}`,
      `Date: ${new Date().toLocaleDateString()}`,
      `Overall Score: ${totalScore}/${maxScore} (${percentage}%)`,
      `Performance Tier: ${tier.label}`,
      "",
      "— Questions & Answers —",
      "",
      ...answers.map((a, i) => [
        `Q${i + 1}. [${a.question.category}] ${a.question.question_text}`,
        `Answer: ${a.answer_text}`,
        `Score: ${a.score}/${a.max_score}`,
        "",
      ].join("\n")),
    ];
    return lines.join("\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateSummaryText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interview-${candidateName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-20 px-4">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0F2B5B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[680px] mx-auto relative z-10">
        {/* Score Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#0F2B5B] text-[#F5F7FA] px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Interview Complete
          </div>

          <h1 className="text-[#0F2B5B] text-4xl font-extrabold mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {candidateName}
          </h1>
          <p className="text-[#64748B] text-[15px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {roleTitle}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(15,43,91,0.08)] border border-[#E8EDF5] mb-8 text-center"
        >
          <div className="mb-2">
            <span
              className="text-7xl font-extrabold"
              style={{ color: tier.color, fontFamily: "'Syne', sans-serif" }}
            >
              {totalScore}
            </span>
            <span className="text-3xl font-bold text-[#94A3B8]" style={{ fontFamily: "'Syne', sans-serif" }}>
              /{maxScore}
            </span>
          </div>

          {/* Progress arc */}
          <div className="my-6">
            <div className="w-full h-3 bg-[#E8EDF5] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tier.color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-[#64748B] mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {percentage}% of maximum score
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white text-[15px] mb-3"
            style={{ backgroundColor: tier.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {tier.label}
          </div>
          <p className="text-[#64748B] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {tier.description}
          </p>
        </motion.div>

        {/* Answers List */}
        <div className="space-y-4 mb-8">
          {answers.map((answer, index) => {
            const colorClass = getScoreColor(answer.score, answer.max_score);
            return (
              <motion.div
                key={answer.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.06 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#E8EDF5] border-l-4 border-l-[#2563EB]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEF4FF] text-[#2563EB] uppercase tracking-wider mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {answer.question.category}
                    </span>
                    <h3
                      className="text-[#0F2B5B] font-bold text-[15px] leading-snug"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {answer.question.question_text}
                    </h3>
                  </div>
                  <div
                    className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-sm font-bold ${colorClass}`}
                  >
                    {answer.score}<span className="text-xs font-normal opacity-60">/{answer.max_score}</span>
                  </div>
                </div>
                <p
                  className="text-[#64748B] text-sm leading-relaxed bg-[#F8FAFC] rounded-lg px-4 py-3 border border-[#E8EDF5]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {answer.answer_text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Export Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#2563EB] text-[#2563EB] font-semibold text-[15px] hover:bg-[#EEF4FF] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Summary
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-[15px] hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Report
          </button>
        </motion.div>

        <div className="text-center mt-8">
          <button
            onClick={onNewInterview}
            className="text-[#64748B] text-sm hover:text-[#0F2B5B] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            ← Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
}
