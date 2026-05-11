"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { countWords } from "@/types/interview";
import type { Question } from "@/types/interview";
import ScoreBadge from "./ScoreBadge";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onSubmit: (answer: string) => Promise<{ score: number }>;
  onNext: () => void;
  isLastQuestion: boolean;
  direction?: number;
}

export default function QuestionCard({
  question,
  questionNumber,
  onSubmit,
  onNext,
  isLastQuestion,
  direction = 1,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = countWords(answer);
  const meetsMinimum = wordCount >= question.min_words;

  useEffect(() => {
    textareaRef.current?.focus();
  }, [question.id]);

  const handleSubmit = async () => {
    if (!meetsMinimum || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await onSubmit(answer);
      setScore(result.score);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setIsSubmitted(false);
    setScore(0);
    onNext();
  };

  const adjustTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(140, textareaRef.current.scrollHeight)}px`;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: direction * 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction * -50, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#E8EDF5] border-l-4 border-l-[#2563EB]">
          {/* Category + score */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EEF4FF] text-[#2563EB] uppercase tracking-wider">
              {question.category}
            </span>
            {isSubmitted && <ScoreBadge score={score} maxScore={question.max_points} visible />}
          </div>

          {/* Question */}
          <h2 className="text-[#0F172A] text-xl sm:text-2xl leading-snug font-extrabold mb-6 font-jakarta">
            {question.question_text}
          </h2>

          {!isSubmitted ? (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={answer}
                  onChange={(e) => { setAnswer(e.target.value); adjustTextarea(); }}
                  placeholder="Type your answer here..."
                  aria-label="Your answer"
                  className="w-full min-h-[140px] px-4 py-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all placeholder:text-[#94A3B8]"
                  disabled={isSubmitting}
                />
                <div className="absolute bottom-3 right-3 text-xs text-[#94A3B8]">
                  {wordCount} / {question.min_words} min
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${meetsMinimum ? "bg-[#2563EB]" : "bg-[#94A3B8]"}`}
                    animate={{ width: `${Math.min(100, (wordCount / question.min_words) * 100)}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                {meetsMinimum && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-[#2563EB] font-semibold"
                  >
                    ✓ Ready
                  </motion.span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!meetsMinimum || isSubmitting}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  meetsMinimum && !isSubmitting
                    ? "bg-[#2563EB] text-white hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.35)] active:scale-[0.98]"
                    : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Evaluating…
                  </span>
                ) : "Submit Answer"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                <p className="text-[#334155] text-sm leading-relaxed">{answer}</p>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-lg active:scale-[0.98] transition-all duration-200"
              >
                {isLastQuestion ? "View Results →" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
