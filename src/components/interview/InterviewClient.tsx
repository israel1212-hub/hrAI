"use client";

import { useState } from "react";
import { createClient } from "../../../supabase/client";
import { scoreAnswer } from "@/types/interview";
import type { Question, InterviewAnswer, AnswerWithQuestion } from "@/types/interview";
import InterviewSetup from "@/components/interview/InterviewSetup";
import InterviewHeader from "@/components/interview/InterviewHeader";
import QuestionCard from "@/components/interview/QuestionCard";
import ResultsSummary from "@/components/interview/ResultsSummary";

type Stage = "setup" | "interview" | "results";

interface InterviewClientProps {
  questions: Question[];
  userId: string | null;
}

export default function InterviewClient({ questions, userId }: InterviewClientProps) {
  const [stage, setStage] = useState<Stage>("setup");
  const [candidateName, setCandidateName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerWithQuestion[]>([]);
  const supabase = createClient();

  const activeQuestions = questions.filter(q => q);
  const currentQuestion = activeQuestions[currentIndex];

  const handleStart = async (name: string, role: string) => {
    setCandidateName(name);
    setRoleTitle(role);

    // Create session in DB
    const maxScore = activeQuestions.reduce((sum, q) => sum + q.max_points, 0);
    const { data, error } = await supabase
      .from("interview_sessions")
      .insert({
        user_id: userId || null,
        candidate_name: name,
        role_title: role,
        status: "in_progress",
        max_possible_score: maxScore,
      })
      .select()
      .single();

    if (!error && data) {
      setSessionId(data.id);
    }

    setCurrentIndex(0);
    setAnswers([]);
    setStage("interview");
  };

  const handleSubmitAnswer = async (answerText: string): Promise<{ score: number }> => {
    const question = activeQuestions[currentIndex];
    const calculatedScore = scoreAnswer(answerText, question.keywords, question.max_points);

    if (sessionId) {
      const { data } = await supabase
        .from("interview_answers")
        .insert({
          session_id: sessionId,
          question_id: question.id,
          answer_text: answerText,
          score: calculatedScore,
          max_score: question.max_points,
        })
        .select()
        .single();

      if (data) {
        const newAnswer: AnswerWithQuestion = {
          ...(data as InterviewAnswer),
          question,
        };
        setAnswers((prev) => [...prev, newAnswer]);
      }
    } else {
      // Offline mode
      const newAnswer: AnswerWithQuestion = {
        id: Math.random().toString(36),
        session_id: "",
        question_id: question.id,
        answer_text: answerText,
        score: calculatedScore,
        max_score: question.max_points,
        submitted_at: new Date().toISOString(),
        question,
      };
      setAnswers((prev) => [...prev, newAnswer]);
    }

    return { score: calculatedScore };
  };

  const handleNext = async () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Complete session
      const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
      if (sessionId) {
        await supabase
          .from("interview_sessions")
          .update({
            status: "completed",
            total_score: totalScore,
            completed_at: new Date().toISOString(),
          })
          .eq("id", sessionId);
      }
      setStage("results");
    }
  };

  const handleNewInterview = () => {
    setStage("setup");
    setCurrentIndex(0);
    setAnswers([]);
    setSessionId(null);
  };

  if (stage === "setup") {
    return <InterviewSetup onStart={handleStart} />;
  }

  if (stage === "results") {
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
    const maxScore = activeQuestions.reduce((sum, q) => sum + q.max_points, 0);
    return (
      <ResultsSummary
        answers={answers}
        totalScore={totalScore}
        maxScore={maxScore}
        candidateName={candidateName}
        roleTitle={roleTitle}
        onNewInterview={handleNewInterview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0F2B5B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <InterviewHeader
        roleTitle={roleTitle}
        candidateName={candidateName}
        currentQuestion={currentIndex + 1}
        totalQuestions={activeQuestions.length}
      />

      <main className="pt-28 pb-16 px-4">
        <div className="max-w-[680px] mx-auto relative z-10">
          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              onSubmit={handleSubmitAnswer}
              onNext={handleNext}
              isLastQuestion={currentIndex === activeQuestions.length - 1}
              direction={1}
            />
          )}
        </div>
      </main>
    </div>
  );
}
