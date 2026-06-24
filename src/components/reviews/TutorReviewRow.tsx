"use client";

import { Star, Calendar, User, BookOpen } from "lucide-react";

interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  studentProfile: {
    user: {
      name: string;
    };
  };
  booking: {
    availability: {
      title: string | null;
      subject: string | null;
    };
  };
}

interface TutorReviewRowProps {
  review: ReviewData;
}

export function TutorReviewRow({ review }: TutorReviewRowProps) {
  const submissionDate = new Date(review.createdAt);

  return (
    <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col gap-3 transition-all relative overflow-hidden">
      {/* Top Header Segment: Identity & Sizing Star Scores */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-200 dark:bg-slate-800 text-primary rounded-xl border border-slate-300/50 dark:border-slate-700/50">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-foreground tracking-tight">
              {review.studentProfile?.user?.name || "Anonymous Learner"}
            </h5>

            {/* Meta Deep Relationship Mapping Section */}
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-semibold">
              <BookOpen className="w-3 h-3 text-emerald-500 dark:text-blue-500 shrink-0" />
              <span>
                {review.booking?.availability?.title || "Untitled Session"}
              </span>
              <span className="text-slate-300 dark:text-slate-700 font-normal">
                |
              </span>
              <span className="text-emerald-500 dark:text-blue-400 font-bold">
                {review.booking?.availability?.subject || "General"}
              </span>
            </div>
          </div>
        </div>

        {/* Core Star Evaluation Render */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating
                  ? "fill-amber-500 text-amber-500"
                  : "text-slate-300 dark:text-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Middle Text Segment: Feedback Block */}
      <div className="text-xs text-muted-foreground leading-relaxed py-1">
        {review.comment ? (
          <p className="text-foreground font-medium bg-background dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 italic">
            &ldquo;{review.comment}&rdquo;
          </p>
        ) : (
          <span className="text-slate-400 dark:text-slate-600 italic">
            No additional commentary provided.
          </span>
        )}
      </div>

      {/* Bottom Segment: Stamp Dates */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold border-t border-slate-200 dark:border-slate-800/40 pt-2.5">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Submitted: {submissionDate.toLocaleDateString()}</span>
        </div>
        <span className="font-mono text-slate-300 dark:text-slate-700">
          ID: {review.id.slice(0, 8)}
        </span>
      </div>
    </div>
  );
}
