"use client";

import React, { useRef, useState } from "react";
import {
  Phone,
  MapPin,
  BookOpen,
  FileText,
  Edit3,
  ShieldCheck,
  Camera,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ProfileDisplayViewProps {
  profile: {
    bio: string;
    education: string;
    phone: string;
    address: string;
    user: { name: string; email: string; image?: string | null };
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
      // Reset input so the same file can be re-selected
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
                {profile.user.name.charAt(0).toUpperCase()}
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
              <span className="text-emerald-500 dark:text-blue-400 bg-emerald-500/10 dark:bg-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20 rounded-md p-1">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {profile.user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/profile/security"
            className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer border border-zinc-300 dark:border-zinc-700/80 shadow-sm flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Change Password
          </Link>
          <button
            onClick={onEditToggle}
            className="px-4 py-2 text-xs font-bold text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5 hover:bg-emerald-500/10 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer border border-emerald-500/30 dark:border-blue-500/40 shadow-sm flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Premium Fully Fixed Contrast Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Contact Info Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors">
          <Phone className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Phone Contact
            </span>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
              {profile.phone || "Not configured"}
            </p>
          </div>
        </div>

        {/* Education Level Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors">
          <BookOpen className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Education Level
            </span>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
              {profile.education || "Not configured"}
            </p>
          </div>
        </div>

        {/* Physical Address Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors md:col-span-2">
          <MapPin className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Mailing Location
            </span>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
              {profile.address || "No address data mapped"}
            </p>
          </div>
        </div>

        {/* Bio Narrative Block */}
        <div className="flex items-start gap-3 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 dark:hover:border-blue-500/30 rounded-xl shadow-xs transition-colors md:col-span-2">
          <FileText className="w-4 h-4 text-emerald-500 dark:text-blue-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Account Biography
            </span>
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {profile.bio || "No biographical parameters provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
