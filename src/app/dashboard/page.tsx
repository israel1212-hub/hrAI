import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import AppShell from "@/components/app-shell";
import {
  ClipboardList,
  Settings,
  ArrowRight,
  ArrowUpRight,
  UserCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/sign-in");

  const { count: sessionCount } = await supabase
    .from("interview_sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: questionCount } = await supabase
    .from("interview_questions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // Right panel content
  const rightPanel = (
    <>
      {/* Profile card */}
      <div className="bg-white rounded-2xl p-4 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#0F172A]">Account</span>
          <ArrowUpRight size={13} className="text-[#94A3B8]" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] flex items-center justify-center text-white font-bold text-sm">
            {user.email?.[0].toUpperCase()}
          </div>
          <div>
            <p className="text-[#0F172A] font-semibold text-xs truncate max-w-[130px]">{user.email}</p>
            <p className="text-[#94A3B8] text-[10px]">Active account</p>
          </div>
        </div>
        <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mb-1">
          <div className="h-full w-[65%] bg-gradient-to-r from-[#7C3AED] to-[#4F6EF7] rounded-full" />
        </div>
        <p className="text-[#94A3B8] text-[10px]">Plan usage 65%</p>
      </div>

      {/* Stats card */}
      <div className="bg-white rounded-2xl p-4 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#0F172A]">Activity</span>
          <ArrowUpRight size={13} className="text-[#94A3B8]" />
        </div>
        {/* Donut placeholder */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7C3AED" strokeWidth="3"
                strokeDasharray={`${(sessionCount ?? 0) > 0 ? 60 : 20} 100`} strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4F6EF7" strokeWidth="3"
                strokeDasharray="25 100" strokeDashoffset="-60" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[#0F172A] font-extrabold text-lg font-syne">{sessionCount ?? 0}</span>
              <span className="text-[#94A3B8] text-[9px]">total</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <p className="text-[#0F172A] font-bold text-sm font-syne">{questionCount ?? 0}</p>
            <p className="text-[#94A3B8] text-[10px]">Questions</p>
          </div>
          <div>
            <p className="text-[#0F172A] font-bold text-sm font-syne">{sessionCount ?? 0}</p>
            <p className="text-[#94A3B8] text-[10px]">Sessions</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <AppShell userEmail={user.email} rightPanel={rightPanel}>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-syne">Overview</span>
          <span className="text-[9px] sm:text-[10px] text-[#94A3B8] bg-[#F8FAFC] px-2 py-0.5 sm:py-1 rounded-lg border border-[#F1F5F9]">This month</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {[
            { label: "Sessions", value: sessionCount ?? 0, color: "text-[#0F172A]" },
            { label: "Questions", value: questionCount ?? 0, color: "text-[#0F172A]" },
            { label: "Avg Score", value: "—", color: "text-[#0F172A]" },
            { label: "Status", value: "Active", color: "text-[#7C3AED]" },
          ].map((s) => (
            <div key={s.label}>
              <p className={`text-lg sm:text-2xl font-extrabold font-syne ${s.color}`}>{s.value}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-syne">Quick Actions</span>
          <ArrowUpRight size={12} className="sm:size-[14px] text-[#94A3B8]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <Link
            href="/interview"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F6EF7] text-white hover:opacity-90 transition-opacity group"
          >
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ClipboardList size={14} className="sm:size-[16px]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs sm:text-sm font-syne">Start Interview</p>
              <p className="text-blue-200 text-[10px] sm:text-xs truncate">Run a candidate session</p>
            </div>
            <ArrowRight size={12} className="sm:size-[14px] shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/interview/admin"
            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] text-[#0F172A] hover:border-[#7C3AED]/30 transition-colors group"
          >
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-[#F3F0FF] flex items-center justify-center shrink-0">
              <Settings size={14} className="sm:size-[16px] text-[#7C3AED]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs sm:text-sm font-syne">Question Builder</p>
              <p className="text-[#94A3B8] text-[10px] sm:text-xs truncate">Manage your questions</p>
            </div>
            <ArrowRight size={12} className="sm:size-[14px] shrink-0 text-[#94A3B8] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Recent activity placeholder ───────────────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#F1F5F9] shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-syne">Recent Sessions</span>
          <ArrowUpRight size={12} className="sm:size-[14px] text-[#94A3B8]" />
        </div>
        {(sessionCount ?? 0) === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-2 sm:mb-3">
              <ClipboardList size={16} className="sm:size-[20px] text-[#7C3AED]" />
            </div>
            <p className="text-[#0F172A] font-semibold text-xs sm:text-sm mb-1">No sessions yet</p>
            <p className="text-[#94A3B8] text-[10px] sm:text-xs mb-3 sm:mb-4">Start your first interview to see results here</p>
            <Link
              href="/interview"
              className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#7C3AED] text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-[#6D28D9] transition-colors"
            >
              Start Interview <ArrowRight size={10} className="sm:size-[12px]" />
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {[
              { id: "M-3201", label: "Session", status: "Completed", color: "bg-green-100 text-green-700" },
              { id: "P-1587", label: "Session", status: "In Progress", color: "bg-blue-100 text-blue-700" },
            ].map((row) => (
              <div key={row.id} className="flex items-center justify-between py-2.5 border-b border-[#F8FAFC] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F3F0FF] flex items-center justify-center">
                    <CheckCircle2 size={13} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="text-[#0F172A] text-xs font-semibold">{row.id}</p>
                    <p className="text-[#94A3B8] text-[10px]">{row.label}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.color}`}>{row.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </AppShell>
  );
}
