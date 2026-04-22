import DashboardNavbar from "@/components/dashboard-navbar";
import { UserCircle, ClipboardList, Settings, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get session count
  const { count: sessionCount } = await supabase
    .from("interview_sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: questionCount } = await supabase
    .from("interview_questions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-[#F5F7FA] min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 py-10 flex flex-col gap-8">
          {/* Header */}
          <header>
            <h1
              className="text-[#0F2B5B] text-3xl font-extrabold mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Dashboard
            </h1>
            <p className="text-[#64748B] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Welcome back, {user.email}
            </p>
          </header>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/interview"
              className="bg-[#2563EB] text-white rounded-2xl p-6 hover:bg-[#1d53d4] transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] group"
            >
              <ClipboardList size={24} className="mb-4 opacity-80" />
              <h2 className="font-bold text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Start Interview
              </h2>
              <p className="text-blue-200 text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Run a candidate through the text-based interview flow
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Begin <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/interview/admin"
              className="bg-white text-[#0F2B5B] rounded-2xl p-6 hover:shadow-md border border-[#E8EDF5] transition-all group"
            >
              <Settings size={24} className="mb-4 text-[#64748B]" />
              <h2 className="font-bold text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Question Builder
              </h2>
              <p className="text-[#64748B] text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Add, edit, and reorder interview questions and scoring criteria
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold text-[#2563EB]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Open Builder <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Total Sessions", value: sessionCount ?? 0 },
              { label: "Custom Questions", value: questionCount ?? 0 },
              { label: "Account", value: "Active" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-[#E8EDF5] shadow-sm">
                <div
                  className="text-2xl font-extrabold text-[#0F2B5B] mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[#64748B] text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* User info */}
          <section className="bg-white rounded-xl p-6 border border-[#E8EDF5] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                <UserCircle size={28} className="text-[#2563EB]" />
              </div>
              <div>
                <h2
                  className="font-bold text-[#0F2B5B]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Account
                </h2>
                <p
                  className="text-sm text-[#64748B]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {user.email}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
