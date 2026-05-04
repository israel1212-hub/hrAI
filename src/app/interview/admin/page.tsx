import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import type { Question } from "@/types/interview";
import AdminPanel from "@/components/interview/AdminPanel";
import AppShell from "@/components/app-shell";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/sign-in");

  const { data: questions } = await supabase
    .from("interview_questions")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <AppShell userEmail={user.email}>
      <AdminPanel
        initialQuestions={(questions as Question[]) ?? []}
        userId={user.id}
      />
    </AppShell>
  );
}
