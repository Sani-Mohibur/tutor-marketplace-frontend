"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, FileQuestion, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[85vh] w-full bg-background flex flex-col items-center justify-center px-4 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. HERO ERROR HEADER SECTION */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xs">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Error Tag */}
          <div className="inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-rose-500/20">
            <AlertCircle className="w-3.5 h-3.5" /> Error 404 • Missing Node
          </div>

          {/* Big Styled 404 Heading */}
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-foreground select-none flex items-center justify-center">
            4
            <span className="text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text mx-1 inline-flex items-center">
              {/* We use standard text gradient properties here, but explicitly set the icon's color string */}
              <FileQuestion className="w-16 h-16 md:w-20 md:h-20 animate-pulse stroke-[2.5] text-emerald-500 dark:text-blue-500" />
            </span>
            4
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Route Lifecycle Terminated
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              The layout coordinate or database index you are trying to reach
              does not exist, has been structurally refactored, or is
              temporarily unmapped.
            </p>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE NAVIGATION ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-muted/60 border border-border/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-background text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20 shadow-sm hover:scale-[1.01] transition-all"
        >
          <Home className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
