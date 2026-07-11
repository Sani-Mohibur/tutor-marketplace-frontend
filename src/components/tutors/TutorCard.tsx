"use client";

import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Clock,
  BookOpen,
  ChevronRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface Tutor {
  id: string;
  name: string;
  user?: {
    image?: string;
  };
  isVerified: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  categories: string[];
  bio: string;
  pricePerHour: number;
  experienceYears: number;
}

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-slate-50 via-indigo-50/60 to-violet-100/40 dark:from-slate-950 dark:via-indigo-950/40 dark:to-violet-950/40 border rounded-[var(--radius-xl)] p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg hover:border-emerald-500/40 dark:hover:border-blue-500/40 hover:shadow-emerald-500/5 dark:hover:shadow-blue-500/5">
      {/* Premium Ambient Background Hover Meshes */}
      <div className="absolute inset-0 rounded-[var(--radius-xl)] opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.10),transparent_45%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_45%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.08),transparent_50%)]" />
      <div>
        {/* Top Header Card Info Row */}
        <div className="flex items-start gap-4">
          {/* Tutor Avatar Frame */}
          <div className="relative shrink-0">
            {tutor.user?.image ? (
              <Image
                src={tutor.user.image}
                alt={tutor.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl object-cover border border-border/80"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-blue-500/10 dark:to-cyan-500/10 text-emerald-600 dark:text-blue-400 flex items-center justify-center text-lg font-black border border-emerald-500/20 dark:border-blue-500/20 shadow-xs">
                {tutor.name.charAt(0).toUpperCase()}
              </div>
            )}

            {tutor.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow-xs">
                <ShieldCheck className="w-4 h-4 fill-emerald-500 dark:fill-blue-500 text-white dark:text-background" />
              </div>
            )}
          </div>

          {/* Title and Badge Metadata Info */}
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1.5 w-full">
              <h2 className="text-sm font-black tracking-tight text-foreground truncate max-w-[140px]">
                {tutor.name}
              </h2>

              {/* Premium Featured Badge Pill */}
              {tutor.isFeatured && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-black tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20 shadow-xs backdrop-blur-xs">
                  <Award className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>

            {/* Micro Rating Indicator Row */}
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-foreground">
                  {tutor.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground/60 text-[10px]">
                ({tutor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Categories / Tag Badges Stack */}
        <div className="flex flex-wrap gap-1 mt-4 max-h-18 overflow-hidden">
          {tutor.categories.map((category) => (
            <span
              key={category}
              className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-gray-300 dark:border-border/40"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Short Text Description Bio */}
        <p className="text-xs text-muted-foreground line-clamp-3 mt-3 leading-relaxed">
          {tutor.bio}
        </p>

        {/* Meta Timeline Tags */}
        <div className="flex items-center gap-3 mt-4 text-[11px] text-muted-foreground/80 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500/80 dark:text-blue-500/80" />
            <span>{tutor.experienceYears} Years Exp</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-teal-500/80 dark:text-blue-500/80" />
            <span>Active Slots</span>
          </div>
        </div>
      </div>

      {/* Footer Price and Booking CTA */}
      <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            Rate
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-base font-black text-foreground">
              ${tutor.pricePerHour}
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold">
              /hr
            </span>
          </div>
        </div>

        <Link href={`/tutors/${tutor.id}`} passHref className="shrink-0">
          <Button className="h-9 px-3.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-blue-600 dark:hover:bg-blue-500 text-white border-none cursor-pointer flex items-center gap-1 shadow-xs group-hover:px-4 transition-all duration-300">
            View Profile
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
