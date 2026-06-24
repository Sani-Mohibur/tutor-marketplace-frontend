"use client";

import { Search } from "lucide-react";

interface FeaturedTutorFilterBarProps {
  activeTab: "all" | "featured" | "standard";
  setActiveTab: (tab: "all" | "featured" | "standard") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function FeaturedTutorFilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: FeaturedTutorFilterBarProps) {
  const tabs = [
    { id: "all", label: "All Tutors" },
    { id: "featured", label: "Featured" },
    { id: "standard", label: "Standard" },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
      {/* Segmented Selection Control Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-black/5 dark:border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Real-time Query Input Field */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by specialty or title..."
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-black/5 dark:border-white/5 bg-card text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:border-black/20 dark:focus:border-white/20 transition-colors"
        />
      </div>
    </div>
  );
}
