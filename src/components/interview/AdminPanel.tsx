"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Question } from "@/types/interview";
import { createClient } from "../../../supabase/client";

interface AdminPanelProps {
  initialQuestions: Question[];
  userId: string;
}

const CATEGORIES = [
  "Problem Solving",
  "Communication",
  "Leadership",
  "Time Management",
  "Adaptability",
  "Technical",
  "Teamwork",
  "General",
];

interface QuestionFormData {
  question_text: string;
  category: string;
  max_points: number;
  min_words: number;
  keywords: string;
}

const defaultForm: QuestionFormData = {
  question_text: "",
  category: "General",
  max_points: 10,
  min_words: 20,
  keywords: "",
};

export default function AdminPanel({ initialQuestions, userId }: AdminPanelProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<QuestionFormData>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const supabase = createClient();

  const openNew = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (q: Question) => {
    setForm({
      question_text: q.question_text,
      category: q.category,
      max_points: q.max_points,
      min_words: q.min_words,
      keywords: q.keywords.join(", "),
    });
    setEditingId(q.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.question_text.trim()) return;
    setSaving(true);
    try {
      const keywords = form.keywords
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

      if (editingId) {
        const { error } = await supabase
          .from("interview_questions")
          .update({
            question_text: form.question_text,
            category: form.category,
            max_points: form.max_points,
            min_words: form.min_words,
            keywords,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);

        if (!error) {
          setQuestions((prev) =>
            prev.map((q) =>
              q.id === editingId
                ? { ...q, ...form, keywords }
                : q
            )
          );
        }
      } else {
        const newSortOrder = questions.length;
        const { data, error } = await supabase
          .from("interview_questions")
          .insert({
            user_id: userId,
            question_text: form.question_text,
            category: form.category,
            max_points: form.max_points,
            min_words: form.min_words,
            keywords,
            sort_order: newSortOrder,
          })
          .select()
          .single();

        if (!error && data) {
          setQuestions((prev) => [...prev, data as Question]);
        }
      }

      setShowForm(false);
      setEditingId(null);
      setForm(defaultForm);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("interview_questions")
      .delete()
      .eq("id", id);

    if (!error) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
    setDeleteConfirmId(null);
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = async (e: React.DragEvent, overIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === overIndex) return;

    const newList = [...questions];
    const [moved] = newList.splice(dragIndex, 1);
    newList.splice(overIndex, 0, moved);
    setDragIndex(overIndex);
    setQuestions(newList);

    // Update sort_order in DB
    await Promise.all(
      newList.map((q, i) =>
        supabase
          .from("interview_questions")
          .update({ sort_order: i })
          .eq("id", q.id)
      )
    );
  };

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

      <div className="max-w-[800px] mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1
              className="text-[#0F2B5B] text-3xl font-extrabold"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Question Builder
            </h1>
            <p
              className="text-[#64748B] text-sm mt-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {questions.length} question{questions.length !== 1 ? "s" : ""} · Drag to reorder
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl font-semibold text-sm hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Question
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-3 mb-8">
          {questions.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E8EDF5]">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-[#64748B] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                No questions yet. Add your first one!
              </p>
            </div>
          )}

          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={() => setDragIndex(null)}
              className={`bg-white rounded-xl p-5 border border-[#E8EDF5] shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group ${
                dragIndex === index ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Drag handle */}
                <div className="text-[#CBD5E1] mt-0.5 flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="5" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="9" cy="19" r="2" />
                    <circle cx="15" cy="5" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="15" cy="19" r="2" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EEF4FF] text-[#2563EB] uppercase tracking-wider"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {q.category}
                    </span>
                    <span className="text-[#94A3B8] text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {q.max_points} pts · min {q.min_words} words
                    </span>
                  </div>
                  <p
                    className="text-[#0F2B5B] font-semibold text-sm leading-snug mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {q.question_text}
                  </p>
                  {q.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {q.keywords.slice(0, 5).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md text-xs bg-[#F1F5F9] text-[#64748B]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {kw}
                        </span>
                      ))}
                      {q.keywords.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md text-xs bg-[#F1F5F9] text-[#94A3B8]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          +{q.keywords.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(q)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#2563EB] hover:bg-[#EEF4FF] transition-colors"
                    title="Edit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(q.id)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Delete confirm */}
              <AnimatePresence>
                {deleteConfirmId === q.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-[#FEE2E2] flex items-center justify-between"
                  >
                    <p className="text-red-600 text-sm font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Delete this question?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1.5 rounded-lg text-[#64748B] text-sm hover:bg-[#F1F5F9] transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Question Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0F2B5B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-8 w-full max-w-[560px] shadow-2xl"
              >
                <h2
                  className="text-[#0F2B5B] text-xl font-extrabold mb-6"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {editingId ? "Edit Question" : "New Question"}
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[#0F2B5B] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Question Text
                    </label>
                    <textarea
                      value={form.question_text}
                      onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))}
                      placeholder="Enter your question..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 resize-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#0F2B5B] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Category
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-sm focus:outline-none focus:border-[#2563EB]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#0F2B5B] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Max Points
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={form.max_points}
                        onChange={(e) => setForm((f) => ({ ...f, max_points: parseInt(e.target.value) || 10 }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-sm focus:outline-none focus:border-[#2563EB]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[#0F2B5B] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Min Words
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={200}
                        value={form.min_words}
                        onChange={(e) => setForm((f) => ({ ...f, min_words: parseInt(e.target.value) || 20 }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-sm focus:outline-none focus:border-[#2563EB]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#0F2B5B] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Scoring Keywords
                      <span className="text-[#94A3B8] font-normal ml-2">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={form.keywords}
                      onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
                      placeholder="analyze, solution, outcome, team, result..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F2B5B] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-[#F8FAFC] transition-colors"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!form.question_text.trim() || saving}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                      form.question_text.trim() && !saving
                        ? "bg-[#2563EB] text-white hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                        : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {saving ? "Saving..." : editingId ? "Save Changes" : "Add Question"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
