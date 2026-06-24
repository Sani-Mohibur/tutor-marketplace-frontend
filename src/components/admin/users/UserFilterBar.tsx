"use client";

import { Search } from "lucide-react";

interface UserFilterBarProps {
  activeTab: "all" | "tutor" | "student" | "admin";
  setActiveTab: (tab: "all" | "tutor" | "student" | "admin") => void;
  statusFilter: "all" | "true" | "false";
  setStatusFilter: (status: "all" | "true" | "false") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function UserFilterBar({
  activeTab,
  setActiveTab,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}: UserFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-card border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-xs">
      <div className="flex flex-wrap gap-3">
        {/* Role Segmentation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-black/5 dark:border-white/5">
          {(["all", "tutor", "student", "admin"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 h-8 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "all" ? "All Roles" : `${tab}s`}
            </button>
          ))}
        </div>

        {/* Operational State (Banned Status) Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-black/5 dark:border-white/5">
          {(["all", "false", "true"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 h-8 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {status === "all"
                ? "All Status"
                : status === "true"
                  ? "Banned"
                  : "Active"}
            </button>
          ))}
        </div>
      </div>

      {/* Query Search Input Field */}
      <div className="relative max-w-xs w-full flex items-center">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search matching email or name..."
          className="w-full h-9 pl-9 pr-4 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-background focus:outline-hidden focus:border-emerald-500/50 dark:focus:border-blue-500/50 transition-colors"
        />
      </div>
    </div>
  );
}
