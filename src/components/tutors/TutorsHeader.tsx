"use client";

import { useEffect } from "react";
import { Search } from "lucide-react";

interface TutorsHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function TutorsHeader({
  searchValue,
  onSearchChange,
}: TutorsHeaderProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("tutor-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
      {/* Subtle Dark Mode Tech Corner Ambient Glow */}
      <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="space-y-4 max-w-2xl relative z-10">
        {/* PRESERVED: Your Original Micro Announcement Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20 text-[11px] font-bold text-emerald-600 dark:text-blue-400 tracking-wide animate-pulse">
          <span>✨ Over 50+ Verified Expert Mentors Available</span>
        </div>

        {/* PRESERVED: Your Original Tutor Headings */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(16,185,129,0.1)] dark:drop-shadow-[0_2px_10px_rgba(59,130,246,0.1)]">
              Mentor
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Discover vetted engineering professionals for real-time code
            reviews, deep-dive architectural consultation, and personalized
            logic paths.
          </p>
        </div>
      </div>
      {/* Premium Glassmorphic Search Input Box */}
      <div className="relative max-w-md group relative z-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70 transition-colors group-focus-within:text-emerald-500 dark:group-focus-within:text-blue-500" />
        <input
          id="tutor-search-input"
          type="text"
          placeholder="Search teachers by name..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pl-11 pr-14 text-xs font-semibold bg-background/80 dark:bg-background/40 backdrop-blur-md hover:bg-background/90 border border-border/80 focus:border-emerald-500/40 dark:focus:border-blue-500/40 rounded-xl outline-hidden transition-all placeholder:text-muted-foreground/60 shadow-xs focus:shadow-[0_0_20px_rgba(16,185,129,0.06)] dark:focus:shadow-[0_0_20px_rgba(59,130,246,0.06)] focus:ring-4 focus:ring-emerald-500/5 dark:focus:ring-blue-500/5"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-muted/90 border border-border/70 text-[10px] text-muted-foreground/70 font-mono font-bold tracking-tight select-none pointer-events-none group-focus-within:opacity-0 transition-opacity duration-200">
          <span>
            {navigator?.platform?.toLowerCase().includes("mac") ? "⌘" : "Ctrl"}
          </span>
          <span>K</span>
        </div>
      </div>
    </div>
  );
}
