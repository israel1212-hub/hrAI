"use client";

import { motion } from "framer-motion";
import { getPerformanceTier, getScoreColor } from "@/types/interview";
import type { AnswerWithQuestion } from "@/types/interview";
import { useState } from "react";
import { Download, Copy, Check, ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

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

  const generateSummaryText = () => [
    `Interview Summary — ${roleTitle}`,
    `Candidate: ${candidateName}`,
    `Date: ${new Date().toLocaleDateString()}`,
    `Overall Score: ${totalScore}/${maxScore} (${percentage}%)`,
    `Performance Tier: ${tier.label}`,
    "",
    "— Questions & Answers —",
    "",
    ...answers.map((a, i) =>
      `Q${i + 1}. [${a.question.category}] ${a.question.question_text}\nAnswer: ${a.answer_text}\nScore: ${a.score}/${a.max_score}\n`
    ),
  ].join("\n");

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
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-[640px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-5">
            <Check size={12} /> Interview Complete
          </div>
          <h1 className="text-[#0F172A] text-3xl font-extrabold mb-1 font-jakarta">{candidateName}</h1>
          <p className="text-[#64748B] text-sm">{roleTitle}</p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="bg-white rounded-2xl p-7 shadow-sm border border-[#E8EDF5] mb-5 text-center"
        >
          <div className="mb-1">
            <span className="text-6xl font-extrabold font-jakarta" style={{ color: tier.color }}>
              {totalScore}
            </span>
            <span className="text-2xl font-bold text-[#94A3B8] font-jakarta">/{maxScore}</span>
          </div>

          <div className="my-5">
            <div className="w-full h-2.5 bg-[#E8EDF5] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tier.color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              />
            </div>
            <p className="text-[#64748B] text-xs mt-2">{percentage}% of maximum score</p>
          </div>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white text-sm mb-2"
            style={{ backgroundColor: tier.color }}
          >
            {tier.label}
          </div>
          <p className="text-[#64748B] text-sm">{tier.description}</p>
        </motion.div>

        {/* Answers */}
        <div className="space-y-3 mb-6">
          {answers.map((answer, index) => {
            const colorClass = getScoreColor(answer.score, answer.max_score);
            return (
              <motion.div
                key={answer.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EDF5] border-l-4 border-l-[#2563EB]"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF4FF] text-[#2563EB] uppercase tracking-wider mb-1.5">
                      {answer.question.category}
                    </span>
                    <h3 className="text-[#0F172A] font-bold text-sm leading-snug font-jakarta">
                      {answer.question.question_text}
                    </h3>
                  </div>
                  <div className={`shrink-0 inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full border text-sm font-bold ${colorClass}`}>
                    {answer.score}<span className="text-xs font-normal opacity-60">/{answer.max_score}</span>
                  </div>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed bg-[#F8FAFC] rounded-lg px-3 py-2.5 border border-[#E8EDF5]">
                  {answer.answer_text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2563EB] text-[#2563EB] font-semibold text-sm hover:bg-[#EEF4FF] transition-colors"
          >
            {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Summary</>}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all"
          >
            <Download size={15} /> Download Report
          </button>
        </motion.div>

        <div className="text-center mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onNewInterview}
            className="inline-flex items-center gap-1.5 text-[#64748B] text-sm hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft size={14} /> Start New Interview
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[#2563EB] text-sm font-semibold hover:text-[#1d53d4] transition-colors"
          >
            <LayoutDashboard size={14} /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
