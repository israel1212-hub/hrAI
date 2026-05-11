"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Question } from "@/types/interview";
import { createClient } from "../../../supabase/client";
import { Plus, Pencil, Trash2, GripVertical, X } from "lucide-react";

interface AdminPanelProps {
  initialQuestions: Question[];
  userId: string;
}

const CATEGORIES = [
  "Problem Solving", "Communication", "Leadership", "Time Management",
  "Adaptability", "Technical", "Teamwork", "General",
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

  const openNew = () => { setForm(defaultForm); setEditingId(null); setShowForm(true); };
  const openEdit = (q: Question) => {
    setForm({ question_text: q.question_text, category: q.category, max_points: q.max_points, min_words: q.min_words, keywords: q.keywords.join(", ") });
    setEditingId(q.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.question_text.trim()) return;
    setSaving(true);
    try {
      const keywords = form.keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
      if (editingId) {
        const { error } = await supabase.from("interview_questions").update({
          question_text: form.question_text, category: form.category,
          max_points: form.max_points, min_words: form.min_words, keywords,
          updated_at: new Date().toISOString(),
        }).eq("id", editingId);
        if (!error) setQuestions((prev) => prev.map((q) => q.id === editingId ? { ...q, ...form, keywords } : q));
      } else {
        const { data, error } = await supabase.from("interview_questions").insert({
          user_id: userId, question_text: form.question_text, category: form.category,
          max_points: form.max_points, min_words: form.min_words, keywords,
          sort_order: questions.length,
        }).select().single();
        if (!error && data) setQuestions((prev) => [...prev, data as Question]);
      }
      setShowForm(false); setEditingId(null); setForm(defaultForm);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("interview_questions").delete().eq("id", id);
    if (!error) setQuestions((prev) => prev.filter((q) => q.id !== id));
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
    await Promise.all(newList.map((q, i) => supabase.from("interview_questions").update({ sort_order: i }).eq("id", q.id)));
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#0F172A] text-xl font-extrabold font-jakarta">Question Builder</h1>
          <p className="text-[#64748B] text-xs mt-0.5">
            {questions.length} question{questions.length !== 1 ? "s" : ""} · Drag to reorder
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white rounded-xl font-semibold text-sm hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all"
        >
          <Plus size={15} /> Add Question
        </button>
      </div>

      {/* Questions list */}
      <div className="space-y-2.5">
        {questions.length === 0 && (
          <div className="text-center py-14 bg-white rounded-2xl border border-[#E8EDF5]">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mx-auto mb-3">
              <Plus size={18} className="text-[#2563EB]" />
            </div>
            <p className="text-[#64748B] text-sm">No questions yet. Add your first one!</p>
          </div>
        )}

        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={() => setDragIndex(null)}
            className={`bg-white rounded-xl p-4 border border-[#E8EDF5] shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group ${dragIndex === index ? "opacity-50" : ""}`}
          >
            <div className="flex items-start gap-3">
              <GripVertical size={14} className="text-[#CBD5E1] mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF4FF] text-[#2563EB] uppercase tracking-wider">
                    {q.category}
                  </span>
                  <span className="text-[#94A3B8] text-xs">{q.max_points} pts · min {q.min_words} words</span>
                </div>
                <p className="text-[#0F172A] font-semibold text-sm leading-snug mb-1.5">{q.question_text}</p>
                {q.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {q.keywords.slice(0, 5).map((kw) => (
                      <span key={kw} className="px-1.5 py-0.5 rounded text-[10px] bg-[#F1F5F9] text-[#64748B]">{kw}</span>
                    ))}
                    {q.keywords.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#F1F5F9] text-[#94A3B8]">+{q.keywords.length - 5}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => openEdit(q)} aria-label="Edit question"
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-[#2563EB] hover:bg-[#EEF4FF] transition-colors">
                  <Pencil size={13} />
                </button>
                <button type="button" onClick={() => setDeleteConfirmId(q.id)} aria-label="Delete question"
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {deleteConfirmId === q.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-red-100 flex items-center justify-between"
                >
                  <p className="text-red-600 text-xs font-medium">Delete this question?</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-1.5 rounded-lg text-[#64748B] text-xs hover:bg-[#F1F5F9] transition-colors">
                      Cancel
                    </button>
                    <button type="button" onClick={() => handleDelete(q.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors">
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-2xl p-7 w-full max-w-[540px] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#0F172A] text-lg font-extrabold font-jakarta">
                  {editingId ? "Edit Question" : "New Question"}
                </h2>
                <button type="button" onClick={() => setShowForm(false)} aria-label="Close"
                  className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="q-text" className="block text-[#0F172A] text-xs font-semibold mb-1.5">Question Text</label>
                  <textarea
                    id="q-text"
                    value={form.question_text}
                    onChange={(e) => setForm((f) => ({ ...f, question_text: e.target.value }))}
                    placeholder="Enter your question..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="q-category" className="block text-[#0F172A] text-xs font-semibold mb-1.5">Category</label>
                    <select
                      id="q-category"
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB]"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="q-points" className="block text-[#0F172A] text-xs font-semibold mb-1.5">Max Points</label>
                    <input
                      id="q-points"
                      type="number"
                      min={1}
                      max={20}
                      value={form.max_points}
                      onChange={(e) => setForm((f) => ({ ...f, max_points: parseInt(e.target.value) || 10 }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-words" className="block text-[#0F172A] text-xs font-semibold mb-1.5">Min Words</label>
                    <input
                      id="q-words"
                      type="number"
                      min={5}
                      max={200}
                      value={form.min_words}
                      onChange={(e) => setForm((f) => ({ ...f, min_words: parseInt(e.target.value) || 20 }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="q-keywords" className="block text-[#0F172A] text-xs font-semibold mb-1.5">
                    Scoring Keywords <span className="text-[#94A3B8] font-normal">(comma-separated)</span>
                  </label>
                  <input
                    id="q-keywords"
                    type="text"
                    value={form.keywords}
                    onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
                    placeholder="analyze, solution, outcome, team, result..."
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-[#F8FAFC] transition-colors">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!form.question_text.trim() || saving}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    form.question_text.trim() && !saving
                      ? "bg-[#2563EB] text-white hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                      : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                  }`}
                >
                  {saving ? "Saving…" : editingId ? "Save Changes" : "Add Question"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
