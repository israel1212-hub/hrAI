export type Question = {
  id: string;
  user_id: string | null;
  question_text: string;
  category: string;
  max_points: number;
  min_words: number;
  keywords: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type InterviewSession = {
  id: string;
  user_id: string;
  candidate_name: string;
  role_title: string;
  status: "in_progress" | "completed";
  total_score: number;
  max_possible_score: number;
  created_at: string;
  completed_at: string | null;
};

export type InterviewAnswer = {
  id: string;
  session_id: string;
  question_id: string;
  answer_text: string;
  score: number;
  max_score: number;
  submitted_at: string;
};

export type AnswerWithQuestion = InterviewAnswer & {
  question: Question;
};

export function scoreAnswer(answerText: string, keywords: string[], maxPoints: number): number {
  if (!answerText || !keywords || keywords.length === 0) return 0;
  
  const lowerAnswer = answerText.toLowerCase();
  const matchedKeywords = keywords.filter(kw => 
    lowerAnswer.includes(kw.toLowerCase())
  );
  
  const ratio = matchedKeywords.length / keywords.length;
  const rawScore = Math.round(ratio * maxPoints);
  
  // Bonus for longer, thoughtful answers (up to 1 extra point)
  const wordCount = answerText.trim().split(/\s+/).length;
  const bonus = wordCount > 100 ? Math.min(1, Math.floor(wordCount / 100)) : 0;
  
  return Math.min(maxPoints, rawScore + bonus);
}

export function getPerformanceTier(totalScore: number, maxScore: number): {
  label: string;
  color: string;
  description: string;
} {
  if (maxScore === 0) return { label: "No Score", color: "#64748B", description: "" };
  
  const percentage = (totalScore / maxScore) * 100;
  
  if (percentage >= 70) {
    return {
      label: "Strong Candidate",
      color: "#2563EB",
      description: "Exceptional performance across all areas. Highly recommended to advance."
    };
  } else if (percentage >= 45) {
    return {
      label: "Promising Candidate",
      color: "#64748B",
      description: "Solid performance with room for growth. Consider for next round."
    };
  } else {
    return {
      label: "Needs Improvement",
      color: "#DC2626",
      description: "Performance below expectations. May need additional evaluation."
    };
  }
}

export function getScoreColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
  if (percentage >= 40) return "text-slate-600 bg-slate-50 border-slate-200";
  return "text-red-600 bg-red-50 border-red-200";
}

export function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}
