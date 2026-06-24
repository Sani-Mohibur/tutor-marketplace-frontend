"use client";

import { Star, StarOff } from "lucide-react";

interface TutorData {
  id: string;
  userId: string;
  title: string;
  isVerified: boolean;
  isFeatured: boolean;
  bio: string;
  qualifications: string;
  skills: string[];
  experienceYears: number;
  pricePerHour: number;
  rating: number;
  // Included nested user interface relation details
  user: {
    id: string;
    name: string;
    email: string;
    banned: boolean;
  };
}

interface FeaturedTutorRowProps {
  tutor: TutorData;
  onToggleFeature: (id: string, currentFeaturedStatus: boolean) => void;
  isActionLoading: string | null;
}

export function FeaturedTutorRow({
  tutor,
  onToggleFeature,
  isActionLoading,
}: FeaturedTutorRowProps) {
  const isMutating = isActionLoading === tutor.id;

  return (
    <tr className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
      {/* Column 1: Tutor Identity Focus */}
      <td className="px-6 py-4">
        <div className="space-y-1 max-w-xs">
          {/* Render real registration name & title headline together */}
          <div className="font-black text-foreground">
            {tutor.user?.name || "Unknown Mentor"}
          </div>
          <div className="text-[11px] font-medium text-primary/80">
            {tutor.title || "No Profile Title Selected"}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">
            {tutor.user?.email}
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed pt-0.5">
            {tutor.bio}
          </p>
        </div>
      </td>

      {/* Column 2: Structural Skills Matrix */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {tutor.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
      </td>

      {/* Column 3: Professional Experience & Rates */}
      <td className="px-6 py-4">
        <div className="space-y-0.5 font-medium text-muted-foreground">
          <div>{tutor.experienceYears} Years Exp</div>
          <div className="text-[11px] text-foreground font-bold">
            ${tutor.pricePerHour}/hr
          </div>
        </div>
      </td>

      {/* Column 4: Platform Standing Badge */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center text-[10px] font-black tracking-wide px-2 py-0.5 rounded border capitalize ${
            tutor.isFeatured
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              : "bg-slate-500/10 text-slate-500 border-slate-500/20"
          }`}
        >
          {tutor.isFeatured ? "Featured" : "Standard"}
        </span>
      </td>

      {/* Column 5: Administrative Toggle Action */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end">
          {tutor.isFeatured ? (
            <button
              disabled={isMutating}
              onClick={() => onToggleFeature(tutor.id, tutor.isFeatured)}
              className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            >
              <StarOff className="w-3.5 h-3.5" />{" "}
              {isMutating ? "Processing..." : "Remove Featured"}
            </button>
          ) : (
            <button
              disabled={isMutating}
              onClick={() => onToggleFeature(tutor.id, tutor.isFeatured)}
              className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-amber-500/10 hover:text-amber-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />{" "}
              {isMutating ? "Processing..." : "Make Featured"}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
