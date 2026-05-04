"use client";

import { useState } from "react";
import { Zap, Settings, CheckCircle, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

const ITEMS = [
  { icon: Zap, title: "AI Auto-Scoring", body: "Our scoring engine automatically evaluates every response using keyword matching and word-count thresholds — giving you instant, objective scores on a 0–10 scale." },
  { icon: Settings, title: "Question Builder", body: "Build your own question bank with custom categories, point weights, minimum word counts, and scoring keywords. Drag to reorder questions in any session." },
  { icon: CheckCircle, title: "Results & Export", body: "Every session generates a full performance report with per-question scores, candidate answers, and a performance tier. Download as a text file or copy to clipboard." },
  { icon: MessageSquare, title: "Session Management", body: "All interview sessions are saved to your account. Review past sessions, compare candidates, and track your hiring pipeline over time." },
];

export default function AccordionSection() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {ITEMS.map((item, i) => {
        const Icon = item.icon;
        const isOpen = open === i;
        return (
          <div key={item.title} className="border-b border-[#E8EDF5] last:border-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#F59E0B]">
                  <Icon size={15} />
                </div>
                <span className={`font-bold text-sm font-syne ${isOpen ? "text-[#2563EB]" : "text-[#0F172A]"}`}>
                  {item.title}
                </span>
              </div>
              {isOpen
                ? <ChevronUp size={16} className="text-[#2563EB] shrink-0" />
                : <ChevronDown size={16} className="text-[#64748B] shrink-0" />
              }
            </button>
            {isOpen && (
              <p className="text-[#64748B] text-sm leading-relaxed pb-4 pl-11">{item.body}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
