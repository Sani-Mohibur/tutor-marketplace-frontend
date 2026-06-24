"use client";

import React from "react";
import { Star, MessageSquare, Award } from "lucide-react";

interface ReviewItem {
  rating: number;
}

interface ReviewAnalyticsHeaderProps {
  reviews: ReviewItem[];
}

export function ReviewAnalyticsHeader({ reviews }: ReviewAnalyticsHeaderProps) {
  const totalCount = reviews.length;

  // Calculate average rating score safely
  const averageRating =
    totalCount > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalCount
        ).toFixed(1)
      : "0.0";

  // Calculate percentage of perfect 5-star review marks
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fiveStarPercentage =
    totalCount > 0 ? Math.round((fiveStarCount / totalCount) * 100) : 0;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      {/* Card 1: Core Score Breakdown */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-3">
        <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 dark:text-blue-400 uppercase bg-emerald-500/10 dark:bg-blue-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 dark:border-blue-500/20 w-fit">
          Reputation Score
        </span>
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            {averageRating}
          </h1>
          <span className="text-xs text-muted-foreground font-bold">
            / 5.0 Rating
          </span>
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(parseFloat(averageRating)) ? "fill-amber-500" : "text-slate-300 dark:text-slate-700"}`}
            />
          ))}
        </div>
      </div>

      {/* Card 2: Total Feedback */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 text-primary rounded-xl border border-blue-500/20">
          <MessageSquare className="w-5 h-5 dark:text-blue-500" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            Total Feedback
          </p>
          <h4 className="text-2xl font-black text-foreground tracking-tight mt-0.5">
            {totalCount} Reviews
          </h4>
        </div>
      </div>

      {/* Card 3: 5-Star Ratio */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-500 dark:text-blue-400 rounded-xl border border-emerald-500/20 dark:border-blue-500/20">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            Satisfaction Ratio
          </p>
          <h4 className="text-2xl font-black text-foreground tracking-tight mt-0.5">
            {fiveStarPercentage}% Perfect
          </h4>
        </div>
      </div>
    </div>
  );
}
