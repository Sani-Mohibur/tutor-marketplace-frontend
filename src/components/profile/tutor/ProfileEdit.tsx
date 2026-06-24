"use client";

import React from "react";
import { ArrowLeft, Shield, Check } from "lucide-react";

interface ProfileEditProps {
  formData: {
    title: string;
    bio: string;
    qualifications: string;
    skills: string[];
    experienceYears: number;
    pricePerHour: number;
    categories: string[];
  };
  systemCategories: { id: string; name: string }[];
  readOnlyData: { name: string; email: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCancel: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export function ProfileEdit({
  formData,
  systemCategories,
  readOnlyData,
  onChange,
  onCancel,
  setFormData,
}: ProfileEditProps) {
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const arrayValues = value.split(",").map((item) => item.trim());
    setFormData((prev: any) => ({
      ...prev,
      skills: value === "" ? [] : arrayValues,
    }));
  };

  // Toggles the category ID string values inside the form state array
  const toggleCategorySelection = (categoryId: string) => {
    setFormData((prev: any) => {
      const alreadySelected = prev.categories.includes(categoryId);
      const updatedCategories = alreadySelected
        ? prev.categories.filter((id: string) => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: updatedCategories };
    });
  };

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
          Editable Tutor Attributes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Professional Headline
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="e.g., Senior MERN Stack Mentor"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Academic Credentials
            </label>
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={onChange}
              placeholder="e.g., BSc in Computer Science"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Teaching Experience (Years)
            </label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={onChange}
              placeholder="e.g., 3"
              min={0}
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Hourly Rate (USD $)
            </label>
            <input
              type="number"
              name="pricePerHour"
              value={formData.pricePerHour}
              onChange={onChange}
              placeholder="e.g., 25.00"
              min={0}
              step="0.01"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Dynamic Category Selection Checkboxes Grid */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Assigned Teaching Categories
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
            {systemCategories.map((cat) => {
              const isSelected = formData.categories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategorySelection(cat.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/5 dark:bg-blue-500/5 border-emerald-500 dark:border-blue-500 text-emerald-600 dark:text-blue-400 shadow-xs"
                      : "bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Expertise Skills (Comma Separated)
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills ? formData.skills.join(", ") : ""}
            onChange={handleSkillsChange}
            placeholder="e.g., JavaScript, Node.js, Next.js, Prisma"
            className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Professional Biography
          </label>
          <textarea
            name="bio"
            rows={5}
            value={formData.bio}
            onChange={onChange}
            placeholder="Describe your background, teaching methodology..."
            className="w-full bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/80 focus:border-emerald-500 dark:focus:border-blue-500/60 rounded-lg px-3.5 py-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none transition-colors shadow-xs resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
