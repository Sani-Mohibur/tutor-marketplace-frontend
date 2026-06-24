"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Settings } from "lucide-react";
import { ProfileEdit } from "@/components/profile/student/ProfileEdit";

interface ProfileData {
  bio: string;
  education: string;
  interests: string[];
  phone: string;
  address: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function StudentProfileEditPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState({
    bio: "",
    education: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
        setFormData({
          bio: json.data.bio || "",
          education: json.data.education || "",
          phone: json.data.phone || "",
          address: json.data.address || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile attributes for editing:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEditing = () => {
    router.push("/profile");
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch(`${API_BASE}/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        router.push("/profile");
      }
    } catch (err) {
      console.error("Profile update execution failure:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const isDirty =
    formData.bio !== (profile?.bio || "") ||
    formData.education !== (profile?.education || "") ||
    formData.phone !== (profile?.phone || "") ||
    formData.address !== (profile?.address || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-zinc-500 dark:text-zinc-400 text-xs font-semibold bg-background animate-pulse">
        Loading interactive edit configurations...
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
            Edit Profile Setup
          </h2>
        </div>
      </div>

      {/* Main Form Structural Layout Area */}
      <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xs w-full">
        <form onSubmit={handleSubmitProfile} className="w-full space-y-6">
          <ProfileEdit
            formData={formData}
            readOnlyData={{
              name: profile?.user.name || "",
              email: profile?.user.email || "",
            }}
            onChange={handleInputChange}
            onCancel={handleCancelEditing}
          />

          {/* Bottom Form Submission Panel Row */}
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
