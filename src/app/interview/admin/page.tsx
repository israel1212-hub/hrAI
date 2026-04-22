import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import type { Question } from "@/types/interview";
import AdminPanel from "@/components/interview/AdminPanel";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: questions } = await supabase
    .from("interview_questions")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      {/* Admin Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F2B5B] border-b border-[#1a3a73]">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span
              className="text-[#F5F7FA] font-bold text-sm"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/interview"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] text-sm transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Interview
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#94A3B8] hover:text-[#F5F7FA] text-sm transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <AdminPanel
          initialQuestions={(questions as Question[]) ?? []}
          userId={user.id}
        />
      </div>
    </div>
  );
}
