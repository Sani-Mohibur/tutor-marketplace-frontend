"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Settings } from "lucide-react";
import { ProfileEdit } from "@/components/profile/tutor/ProfileEdit";

interface TutorProfileData {
  title: string;
  bio: string;
  qualifications: string;
  skills: string[];
  experienceYears: number;
  pricePerHour: number;
  categories: { id: string; name: string }[];
  user: { name: string; email: string; role: string };
}

interface SystemCategory {
  id: string;
  name: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function TutorProfileEditPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<TutorProfileData | null>(null);
  const [systemCategories, setSystemCategories] = useState<SystemCategory[]>(
    [],
  );

  // Safe default initializations to completely avoid empty values or payload 500 crashes
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    qualifications: "",
    skills: [] as string[],
    experienceYears: 0,
    pricePerHour: 0,
    categories: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Added cache: "no-store" to enforce live payload verification
        const [profileRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/profile/me`, {
            credentials: "include",
            cache: "no-store",
          }),
          fetch(`${API_BASE}/tutor/categories`, { cache: "no-store" }),
        ]);

        const profileJson = await profileRes.json();
        const categoriesJson = await categoriesRes.json();

        if (categoriesJson.success) {
          setSystemCategories(
            categoriesJson.data || categoriesJson.categories || [],
          );
        }

        if (profileJson.success && profileJson.data) {
          setProfile(profileJson.data);
          setFormData({
            title: profileJson.data.title || "",
            bio: profileJson.data.bio || "",
            qualifications: profileJson.data.qualifications || "",
            skills: profileJson.data.skills || [],
            experienceYears: Number(profileJson.data.experienceYears) || 0,
            pricePerHour: Number(profileJson.data.pricePerHour) || 0,
            categories:
              profileJson.data.categories?.map((c: any) => c.id) || [],
          });
        }
      } catch (err) {
        console.error(
          "Error setting up tutor edit form contextual layer:",
          err,
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Strictly handle number conversions so it never accidentally passes string variants
    const parsedValue =
      name === "experienceYears" || name === "pricePerHour"
        ? value === ""
          ? 0
          : Number(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleCancelEditing = () => {
    router.push("/profile");
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      // Strict fallback enforcement to keep data type compliance pristine
      const sanitizedPayload = {
        ...formData,
        experienceYears: Number(formData.experienceYears) || 0,
        pricePerHour: Number(formData.pricePerHour) || 0,
      };

      const res = await fetch(`${API_BASE}/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedPayload),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        router.refresh(); // Clear client layouts router cache context flags safely
        router.push("/profile");
      }
    } catch (err) {
      console.error("Tutor profile update execution failure:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const initialCategoryIds = profile?.categories?.map((c: any) => c.id) || [];

  const isDirty =
    formData.title !== (profile?.title || "") ||
    formData.bio !== (profile?.bio || "") ||
    formData.qualifications !== (profile?.qualifications || "") ||
    JSON.stringify(formData.skills) !== JSON.stringify(profile?.skills || []) ||
    formData.experienceYears !== (profile?.experienceYears || 0) ||
    formData.pricePerHour !== (profile?.pricePerHour || 0) ||
    JSON.stringify([...formData.categories].sort()) !==
      JSON.stringify([...initialCategoryIds].sort());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-zinc-500 dark:text-zinc-400 text-xs font-semibold bg-background animate-pulse">
        Loading interactive tutor edit configurations...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-6 max-w-4xl mx-auto w-full space-y-8 text-zinc-900 dark:text-zinc-100">
      <div className="w-full flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-500 dark:text-blue-400" />
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Edit Profile Setup
          </h2>
        </div>
      </div>

      <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xs w-full">
        <form onSubmit={handleSubmitProfile} className="w-full space-y-6">
          <ProfileEdit
            formData={formData}
            systemCategories={systemCategories}
            readOnlyData={{
              name: profile?.user.name || "",
              email: profile?.user.email || "",
            }}
            onChange={handleInputChange}
            onCancel={handleCancelEditing}
            setFormData={setFormData}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 w-full">
            <button
              type="button"
              onClick={handleCancelEditing}
              className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 rounded-xl transition-all border border-zinc-300 dark:border-zinc-700/80 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || !isDirty}
              className="px-6 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 dark:from-blue-600 dark:to-cyan-500 dark:hover:from-blue-500 dark:hover:to-cyan-400 disabled:opacity-30 disabled:pointer-events-none shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[75px]"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
