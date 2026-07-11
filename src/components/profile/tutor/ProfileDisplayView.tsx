"use client";

import React, { useRef, useState } from "react";
import {
  FileText,
  Edit3,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  DollarSign,
  Star,
  Award,
  Tags,
  Camera,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ProfileDisplayViewProps {
  profile: {
    title?: string;
    isVerified: boolean;
    bio?: string;
    qualifications?: string;
    skills: string[];
    experienceYears: number;
    pricePerHour: number;
    rating: number;
    reviewCount: number;
    user: { name: string; email: string; image?: string | null };
    categories?: { id: string; name: string }[];
  };
  onEditToggle: () => void;
  onProfileRefresh?: () => void;
}

export function ProfileDisplayView({
  profile,
  onEditToggle,
  onProfileRefresh,
}: ProfileDisplayViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be under 10MB.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading profile image...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE}/profile/upload-image`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Profile image updated!", { id: toastId });
        onProfileRefresh?.();
      } else {
        toast.error(json.message || "Failed to upload image.", { id: toastId });
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("An error occurred while uploading.", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Upper Account Banner Lockup */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800/80 w-full">
        <div className="flex items-center gap-4">
          {/* Avatar with upload overlay */}
          <div className="relative group">
            {profile.user.image ? (
              <Image
                src={profile.user.image}
                alt={profile.user.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500/20 dark:border-blue-500/30"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border-2 border-emerald-500/20 dark:border-blue-500/30 text-emerald-500 dark:text-blue-400 flex items-center justify-center font-black text-2xl select-none">
                {profile.user.name?.charAt(0).toUpperCase() || "T"}
              </div>
            )}
            {/* Upload overlay */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {profile.user.name}
              </h1>
              {profile.isVerified && (
                <span className="text-emerald-500 dark:text-blue-400 bg-emerald-500/10 dark:bg-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20 rounded-md p-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {profile.title || "Professional Tutor"} — {profile.user.email}
            </p>
          </div>
        </div>

        <button
          onClick={onEditToggle}
          className="px-4 py-2 text-xs font-bold text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5 hover:bg-emerald-500/10 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer border border-emerald-500/30 dark:border-blue-500/40 shadow-sm flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Tutor Attributes
        </button>
      </div>

      {/* Stats Counter Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <div className="p-3 bg-zinc-50/40 dark:bg-zinc-900/20 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl flex items-center gap-2.5">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
              Rating
            </p>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              {profile.rating.toFixed(1)} ({profile.reviewCount} reviews)
            </p>
          </div>
        </div>
        <div className="p-3 bg-zinc-50/40 dark:bg-zinc-900/20 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl flex items-center gap-2.5">
          <DollarSign className="w-4 h-4 text-teal-500 dark:text-blue-500" />
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
              Hourly Rate
            </p>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              ${profile.pricePerHour.toFixed(2)}/hr
            </p>
          </div>
        </div>
      </div>

      {/* Core Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Experience Level Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors">
          <Briefcase className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Teaching Experience
            </span>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
              {profile.experienceYears} Year
              {profile.experienceYears !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Qualifications Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors">
          <GraduationCap className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Academic Credentials
            </span>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
              {profile.qualifications || "Not configured"}
            </p>
          </div>
        </div>

        {/* Assigned Profile Categories Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors md:col-span-2">
          <Tags className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-2 w-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
              Teaching Categories
            </span>
            {profile.categories && profile.categories.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-md bg-emerald-500/5 dark:bg-blue-500/10 border border-emerald-500/10 dark:border-blue-500/20 text-emerald-600 dark:text-blue-400"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-medium text-zinc-500">
                No profile categories mapped.
              </p>
            )}
          </div>
        </div>

        {/* Subjects & Skills Tag Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors md:col-span-2">
          <Award className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-2 w-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
              Expertise Subjects & Skills
            </span>
            {profile.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-medium text-zinc-500">
                No expertise topics configured.
              </p>
            )}
          </div>
        </div>

        {/* Bio Narrative Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors md:col-span-2">
          <FileText className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Tutor Biography
            </span>
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {profile.bio || "No professional biography parameters provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
