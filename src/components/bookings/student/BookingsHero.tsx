"use client";

import React from "react";
import { CalendarCheck } from "lucide-react";

export function BookingsHero() {
  return (
    <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Structural Neon Ambient Light */}
      <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
          <CalendarCheck className="w-3.5 h-3.5" /> Synchronized Learning Portal
        </div>

        {/* Title Matching Font Weights and Gradients */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          My Session{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
            Bookings
          </span>
        </h1>

        {/* Description Body Text */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Manage your active learning enrollments, keep track of upcoming
          real-time architectural consultation slots, and review completed
          mentorship items securely.
        </p>
      </section>
    </div>
  );
}
