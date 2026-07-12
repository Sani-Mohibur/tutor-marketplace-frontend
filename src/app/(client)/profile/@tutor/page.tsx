"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { ProfileDisplayView } from "@/components/profile/tutor/ProfileDisplayView";

interface TutorProfileData {
  title?: string;
  isVerified: boolean;
  bio?: string;
  qualifications?: string;
  skills: string[];
  experienceYears: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  totalHoursTaught: number;
  images?: string[];
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function TutorProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<TutorProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/profile/me`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success && json.data) {
        setProfile(json.data);
      }
    } catch (err) {
      console.error(
        "Error fetching tutor profile contextual attributes layer:",
        err,
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-zinc-500 dark:text-zinc-400 text-xs font-semibold bg-background animate-pulse">
        Restoring authenticated profile context data...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-6 max-w-4xl mx-auto w-full space-y-8 text-zinc-900 dark:text-zinc-100">
      {/* Workspace Dashboard Header */}
      <div className="w-full flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-500 dark:text-blue-400" />
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Workspace Management
          </h2>
        </div>
      </div>

      {/* Main Structural Layout Area */}
      <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xs w-full">
        {profile && (
          <ProfileDisplayView
            profile={profile}
            onEditToggle={() => router.push("/profile/edit")}
            onProfileRefresh={fetchProfileData}
          />
        )}
      </div>
    </main>
  );
}
