"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  GraduationCap,
  Brain,
  Lightbulb,
  Code,
  Laptop,
  Database,
  Cpu,
  Globe,
  MessageSquare,
  Users,
  Languages,
  Briefcase,
  TrendingUp,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Compass,
} from "lucide-react";

const ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  BookOpen: { icon: BookOpen, color: "text-blue-500" },
  GraduationCap: { icon: GraduationCap, color: "text-emerald-500" },
  Brain: { icon: Brain, color: "text-purple-500" },
  Lightbulb: { icon: Lightbulb, color: "text-amber-500" },
  Code: { icon: Code, color: "text-cyan-500" },
  Laptop: { icon: Laptop, color: "text-indigo-500" },
  Database: { icon: Database, color: "text-rose-500" },
  Cpu: { icon: Cpu, color: "text-teal-500" },
  Globe: { icon: Globe, color: "text-sky-500" },
  MessageSquare: { icon: MessageSquare, color: "text-pink-500" },
  Users: { icon: Users, color: "text-orange-500" },
  Languages: { icon: Languages, color: "text-fuchsia-500" },
  Briefcase: { icon: Briefcase, color: "text-yellow-600" },
  TrendingUp: { icon: TrendingUp, color: "text-lime-600" },
  Target: { icon: Target, color: "text-red-500" },
  Award: { icon: Award, color: "text-yellow-500" },
};

interface CategoryData {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/featured-categories`
        );
        const json = await res.json();
        if (json.success) {
          setCategories(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch featured categories", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="w-full py-20 border-b border-card-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="w-full py-20 border-b border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Explore Top Categories
            </h2>
            <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-0">
              Discover the most popular topics you want to learn, explore specialized
              skills, and find the perfect mentor to help you succeed.
            </p>
          </div>

          {/* Carousel Navigation (Desktop only, if needed) */}
          {categories.length > 4 && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-full border border-border/50 transition-all ${
                  canScrollLeft
                    ? "bg-card hover:bg-muted text-foreground cursor-pointer shadow-sm hover:shadow-md"
                    : "bg-muted/30 text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-full border border-border/50 transition-all ${
                  canScrollRight
                    ? "bg-card hover:bg-muted text-foreground cursor-pointer shadow-sm hover:shadow-md"
                    : "bg-muted/30 text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel / Grid Container */}
        <div className="relative group/carousel">
          {/* Mobile Left Arrow */}
          {categories.length > 4 && canScrollLeft && (
            <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2">
              <button
                onClick={() => scroll("left")}
                className="p-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-md text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className={
              categories.length <= 4
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 [&::-webkit-scrollbar]:hidden"
            }
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => {
              const mapped = category.icon ? ICON_MAP[category.icon] : null;
              const IconComp = mapped ? mapped.icon : Compass;
              const iconColor = mapped ? mapped.color : "text-primary";

              return (
                <div
                  key={category.id}
                  className={`group p-6 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm shadow-sm hover:border-brand-accent/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-brand-accent/5 dark:hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden flex flex-col ${
                    categories.length > 4
                      ? "snap-start shrink-0 w-[280px] sm:w-[300px]"
                      : "w-full"
                  }`}
                >
                  {/* Top Accent Bar: Emerald in Light, Blue/Cyan in Dark */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent dark:bg-gradient-to-r dark:from-blue-500 dark:to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className={`mb-4 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 ${category.icon && category.icon.startsWith("http") ? "text-primary" : iconColor}`}>
                    {category.icon && category.icon.startsWith("http") ? (
                      <img src={category.icon} alt={category.name} className="w-6 h-6 object-cover rounded-sm" />
                    ) : (
                      <IconComp className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-foreground transition-colors tracking-tight capitalize">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-medium line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Right Arrow */}
          {categories.length > 4 && canScrollRight && (
            <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2">
              <button
                onClick={() => scroll("right")}
                className="p-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-md text-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
