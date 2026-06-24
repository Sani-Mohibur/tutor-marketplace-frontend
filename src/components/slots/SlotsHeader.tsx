"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function SlotsHeader() {
  const router = useRouter();

  return (
    <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
      {/* Subtle Dark Mode Tech Corner Ambient Glow */}
      <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 max-w-2xl relative z-10">
        {/* PRESERVED: Micro Announcement Badge Style */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20 text-[11px] font-bold text-emerald-600 dark:text-blue-400 tracking-wide animate-pulse">
          <span>✨ Manage Your Availability Calendars</span>
        </div>

        {/* PRESERVED: Exact Typography Scaling */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
            Configure Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(16,185,129,0.1)]">
              Slots
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Set up custom availability dates, offer free discovery sessions, and
            monitor upcoming or past historical bookings from your unified
            workspace.
          </p>
        </div>
      </div>

      {/* Premium Button Container - Replacing Search Box Coordinates Exactly */}
      <div className="relative max-w-md group relative z-10">
        <button
          onClick={() => router.push("/slots/create")}
          className="w-full h-12 px-5 flex items-center justify-center gap-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Appointment Slot
        </button>
      </div>
    </div>
  );
}
