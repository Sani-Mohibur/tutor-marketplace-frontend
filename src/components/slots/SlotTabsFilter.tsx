"use client";

import React from "react";

interface SlotTabsFilterProps {
  activeTab: "upcoming" | "past";
  setActiveTab: (tab: "upcoming" | "past") => void;
}

export function SlotTabsFilter({
  activeTab,
  setActiveTab,
}: SlotTabsFilterProps) {
  return (
    <div className="flex border-b border-border/60 mb-6">
      <button
        onClick={() => setActiveTab("upcoming")}
        className={`cursor-pointer px-4 py-2.5 text-sm font-semibold transition-all -mb-[1px] ${
          activeTab === "upcoming"
            ? "border-b-2 border-emerald-500 dark:border-blue-500 text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Upcoming Sessions
      </button>
      <button
        onClick={() => setActiveTab("past")}
        className={`cursor-pointer px-4 py-2.5 text-sm font-semibold transition-all -mb-[1px] ${
          activeTab === "past"
            ? "border-b-2 border-emerald-500 dark:border-blue-500 text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Past History
      </button>
    </div>
  );
}
