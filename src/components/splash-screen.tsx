"use client";

import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fadeout" | "done">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeout"), 2200);
    const t2 = setTimeout(() => setPhase("done"), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0A1E] transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Pulsing rings + icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-[2.5rem] bg-[#7C3AED]/30 splash-ping-1" />
          <div className="absolute w-28 h-28 rounded-[2.5rem] bg-[#7C3AED]/15 splash-ping-2" />
          <div className="relative w-28 h-28 rounded-[2.5rem] bg-[#7C3AED] flex items-center justify-center shadow-[0_0_60px_rgba(124,58,237,0.8)]">
            <Brain size={56} className="text-white splash-icon-glow" />
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <p className="text-white text-2xl font-extrabold font-syne tracking-tight splash-text-glow">
            HireMind
          </p>
          <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">Loading…</p>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full splash-loadbar" />
        </div>
      </div>
    </div>
  );
}
