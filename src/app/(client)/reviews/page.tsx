"use client";

import React, { useState, useEffect } from "react";
import { ReviewAnalyticsHeader } from "@/components/reviews/ReviewAnalyticsHeader";
import { TutorReviewRow } from "@/components/reviews/TutorReviewRow";
import { Loader2, MessageSquareX, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DedicatedTutorReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchTutorDataAndReviews = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);

        // 1. Fetch exact personal profile endpoint
        const profileRes = await fetch(`${apiBase}/profile/me`, {
          credentials: "include",
        });
        const profileJson = await profileRes.json();

        // 2. Extract the profile ID from your custom endpoint schema
        const tutorProfileId = profileJson?.data?.id;

        if (!tutorProfileId) {
          console.error("Could not resolve a profile id from /profile/me");
          setIsLoading(false);
          return;
        }

        // 3. Fetch reviews using your verified public route
        const res = await fetch(`${apiBase}/reviews/tutor/${tutorProfileId}`);
        const json = await res.json();

        if (json.success) {
          setReviews(json.data || []);
        }
      } catch (err) {
        console.error("Error fetching tutor reviews dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorDataAndReviews();
  }, [userId, apiBase]);

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> Performance Feedback Ledger
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Your Reputation{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Metrics
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Review historical evaluation scores, comment breakdowns, and dynamic
            satisfaction metrics left by your active engineering students after
            completing specialized logic paths.
          </p>
        </section>
      </div>

      {/* 2. REVIEWS WORKSPACE LIST HEADER */}
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800/60 pb-4 pt-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-foreground">
            Verified Student Feedback
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Historical commentary records and session evaluation details
            submitted by active learners.
          </p>
        </div>

        <div className="ml-auto bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1 text-xs font-bold text-foreground">
          {reviews.length} Logs
        </div>
      </div>

      {/* 1. ANALYTICS SCOREBOARD HEADER */}
      <ReviewAnalyticsHeader reviews={reviews} />

      {/* 2. REVIEWS WORKSPACE LIST */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold tracking-tight text-muted-foreground uppercase tracking-wider">
          All Student Comments ({reviews.length})
        </h3>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">
              Synchronizing reputation logs from secure registry layers...
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-16 text-center space-y-3 bg-slate-50/40 dark:bg-slate-900/40">
            <div className="p-3 bg-slate-200 dark:bg-slate-800 inline-flex rounded-full text-muted-foreground">
              <MessageSquareX className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h5 className="font-bold text-sm text-foreground">
                Feedback Ledger Empty
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You haven&apos;t received any student session reviews or comment
                evaluations on this profile route yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((item: any) => (
              <TutorReviewRow key={item.id} review={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
