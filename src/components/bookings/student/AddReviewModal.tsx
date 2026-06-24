"use client";

import { useState, useTransition } from "react";
import { Star, X } from "lucide-react";
import { BookingData } from "./BookingCard";

interface AddReviewModalProps {
  booking: BookingData | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (payload: {
    bookingId: string;
    rating: number;
    comment: string;
  }) => Promise<void>;
}

export function AddReviewModal({
  booking,
  isOpen,
  onClose,
  onSubmitReview,
}: AddReviewModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!isOpen || !booking) return null;

  const tutorName = booking.availability.tutorProfile.user.name;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await onSubmitReview({
        bookingId: booking.id,
        rating,
        comment: comment.trim(),
      });
      // Reset state and close on success
      setComment("");
      setRating(5);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
        onClick={!isPending ? onClose : undefined}
      />

      {/* Modal Surface Box */}
      <div className="relative w-full max-w-md border border-border/50 bg-background rounded-xl p-5 shadow-lg animate-in fade-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-start justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight text-foreground">
              Review Your Session
            </h3>

            <p className="text-[11px] text-muted-foreground leading-snug">
              Share your feedback for{" "}
              <span className="text-foreground font-medium">{tutorName}</span>
            </p>
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/30 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Interactive Star Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Rating
            </label>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => {
                const currentStarValue = index + 1;

                const isLit =
                  hoverRating !== null
                    ? currentStarValue <= hoverRating
                    : currentStarValue <= rating;

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={isPending}
                    onClick={() => setRating(currentStarValue)}
                    onMouseEnter={() => setHoverRating(currentStarValue)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-0.5 transition-transform hover:scale-110 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Star
                      className={`w-5 h-5 transition-colors ${
                        isLit
                          ? "text-amber-500 fill-amber-500"
                          : "text-muted-foreground/60 fill-transparent stroke-muted-foreground/70 stroke-[1.5]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment Text Area */}
          <div className="space-y-1.5">
            <label
              htmlFor="comment"
              className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              Your Feedback
            </label>
            <textarea
              id="comment"
              rows={3}
              maxLength={300}
              disabled={isPending}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What went well? How could the session be improved?..."
              className="w-full text-xs bg-muted/20 border border-border/40 focus:border-emerald-500 dark:focus:border-blue-500 rounded-lg p-2.5 outline-hidden resize-none transition-colors disabled:opacity-60"
            />
          </div>

          {/* Action Footer Buttons */}
          <div className="flex justify-end items-center gap-2 pt-1">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted rounded-lg cursor-pointer transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-emerald-600/50 dark:disabled:bg-blue-600/50 rounded-lg cursor-pointer transition-colors"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
