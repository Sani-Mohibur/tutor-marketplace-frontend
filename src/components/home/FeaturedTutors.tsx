"use client";

import { useState } from "react";
import { TutorCard, Tutor } from "@/components/tutors/TutorCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FeaturedTutorsProps {
  initialFeaturedTutors: Tutor[];
}

export function FeaturedTutors({ initialFeaturedTutors }: FeaturedTutorsProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredTutors = initialFeaturedTutors.filter(
    (tutor) => tutor.isFeatured,
  );
  const hasMore = visibleCount < featuredTutors.length;

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, featuredTutors.length),
    );
  };

  return (
    <section className="w-full py-20 border-b border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching your exact structure */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Our Featured Tutors
          </h2>
          <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed">
            Learn from elite, vetted instructors handpicked for exceptional
            teaching history, deep industry expertise, and proven subject
            mastery to accelerate your growth.
          </p>
        </div>

        {/* Tutors Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutors.slice(0, visibleCount).map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        {/* Interactive Progressive Show More Trigger */}
        {hasMore && (
          <div className="flex justify-center pt-12">
            <Button
              onClick={handleShowMore}
              className="h-11 px-6 text-xs font-bold rounded-xl border border-border/80 bg-background hover:bg-muted text-foreground cursor-pointer flex items-center gap-2 shadow-xs transition-all duration-200 hover:scale-[1.01]"
            >
              Show More Tutors
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
