"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getScoreColor } from "@/types/interview";

interface ScoreBadgeProps {
  score: number;
  maxScore: number;
  visible: boolean;
}

export default function ScoreBadge({ score, maxScore, visible }: ScoreBadgeProps) {
  const colorClass = getScoreColor(score, maxScore);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-bold text-sm ${colorClass}`}
        >
          <span className="text-base font-extrabold font-jakarta">{score}</span>
          <span className="text-xs font-normal opacity-70">/ {maxScore}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
