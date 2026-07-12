"use client";

import React, { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";

interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  isPlaceholder: boolean;
  placeholderName: string | null;
  studentProfile: { user: { name: string; image?: string | null } } | null;
  tutorProfileId: string;
  tutorProfile: { user: { name: string; image?: string | null } };
  createdAt: string;
}

export default function FeaturedReviews() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/featured`);
        const json = await res.json();
        if (json.success) {
          setReviews(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch featured reviews", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-20 bg-muted/10 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="w-full py-20 bg-muted/10 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Student Success Stories
          </h2>
          <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-0">
            Read what our students have to say about their learning experience and how our tutors helped them achieve their goals.
          </p>
        </div>

        {/* CSS Grid will automatically handle variable heights per row */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review) => {
            const reviewerName = review.isPlaceholder
              ? review.placeholderName
              : review.studentProfile?.user?.name || "Anonymous";

            const tutorName = review.tutorProfile?.user?.name || "Unknown";
            const tutorImage = review.tutorProfile?.user?.image;

            return (
              <div
                key={review.id}
                className="p-8 rounded-3xl border border-border/40 bg-gray-50 dark:bg-gray-800/80 break-inside-avoid"
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                        }`}
                    />
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed text-foreground/80 font-medium mb-8">
                  "{review.comment || "Great experience with this tutor!"}" — {reviewerName}
                </p>

                <div className="flex items-center gap-4">
                  {tutorImage ? (
                    <img src={tutorImage} alt={tutorName} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg uppercase">
                      {tutorName ? tutorName.charAt(0) : "T"}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h4 className="font-bold text-foreground text-base tracking-tight">{tutorName}</h4>
                    <a href={`/tutors/${review.tutorProfileId}`} className="text-sm text-emerald-500 dark:text-blue-500 hover:underline mt-0.5 inline-block">
                      View profile
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}