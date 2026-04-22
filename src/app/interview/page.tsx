import { createClient } from "../../../supabase/server";
import type { Question } from "@/types/interview";
import InterviewClient from "@/components/interview/InterviewClient";

export default async function InterviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch questions ordered by sort_order
  const { data: questions } = await supabase
    .from("interview_questions")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <InterviewClient
      questions={(questions as Question[]) ?? []}
      userId={user?.id ?? null}
    />
  );
}
