"use client";

import React from "react";
import { ArrowLeft, Shield } from "lucide-react";

interface ProfileEditProps {
  formData: { bio: string; education: string; phone: string; address: string };
  readOnlyData: { name: string; email: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCancel: () => void;
}

export function ProfileEdit({
  formData,
  readOnlyData,
  onChange,
  onCancel,
}: ProfileEditProps) {
  return (
    <div className="w-full space-y-6 text-left text-zinc-900 dark:text-zinc-100">
      {/* Upper Navigation Row */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 w-full">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Return to View Mode
        </button>
      </div>

      {/* Account Info Section Container */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-400" />{" "}
          Core Account Metadata (Read-Only)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Locked Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              disabled
              value={readOnlyData.name}
              className="w-full bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/80 rounded-lg px-3 py-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium cursor-not-allowed select-none shadow-inner"
            />
          </div>

          {/* Locked Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <input
              type="text"
              disabled
              value={readOnlyData.email}
              className="w-full bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/80 rounded-lg px-3 py-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium cursor-not-allowed select-none shadow-inner"
            />
          </div>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800/80" />

      {/* Mutable Attributes Inputs Matrix */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Editable Student Attributes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Input Control */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Phone Contact
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="e.g., +880 17XXXXXXXX"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          {/* Education Input Control */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Education Level
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={onChange}
              placeholder="e.g., Undergraduate, High School"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Address Input Control */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Mailing Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter your current street location address parameters"
            className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
          />
        </div>

        {/* Bio Textarea Input Control */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Personal Biography
          </label>
          <textarea
            name="bio"
            rows={5}
            value={formData.bio}
            onChange={onChange}
            placeholder="Describe your learning trajectory or specific tech framework targets..."
            className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3.5 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
