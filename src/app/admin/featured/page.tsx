"use client";

import { useState, useEffect } from "react";
import { Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { FeaturedTutorFilterBar } from "@/components/admin/featured/FeaturedTutorFilterBar";
import { FeaturedTutorRow } from "@/components/admin/featured/FeaturedTutorRow";
import { Pagination } from "@/components/shared/Pagination";

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
  // Included nested user relation properties to surface names and emails
  user: {
    id: string;
    name: string;
    email: string;
    banned: boolean;
  };
}

interface MetaData {
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminFeaturedTutorsPage() {
  const [tutors, setTutors] = useState<TutorData[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"all" | "featured" | "standard">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchTutors = async () => {
    try {
      setIsLoading(true);

      let isFeaturedParam = "all";
      if (activeTab === "featured") isFeaturedParam = "true";
      if (activeTab === "standard") isFeaturedParam = "false";

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchQuery,
        isFeatured: isFeaturedParam,
      });

      const res = await fetch(`${apiBase}/admin/tutors?${queryParams}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setTutors(json.data || []);
        setMeta(json.meta || null);
      }
    } catch (err) {
      console.error("Failed fetching tutor catalog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  useEffect(() => {
    fetchTutors();
  }, [currentPage, activeTab, searchQuery]);

  const handleToggleFeature = async (
    tutorId: string,
    currentFeaturedStatus: boolean,
  ) => {
    try {
      setIsActionLoading(tutorId);
      const nextState = !currentFeaturedStatus;

      const res = await fetch(`${apiBase}/admin/tutors/${tutorId}/featured`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFeatured: nextState }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success(
          nextState ? "Tutor featured successfully" : "Featured status removed",
        );
        fetchTutors();
      } else {
        toast.error(
          json.message || "Failed to update highlight placement status.",
        );
      }
    } catch (err) {
      console.error("Feature action execution blocked:", err);
      toast.error("Network communication failure.");
    } finally {
      setIsActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Featured Tutors Showcase
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Promote exceptional educators to the main portal homepage or manage
          standard positioning ranks.
        </p>
      </div>

      <FeaturedTutorFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Tutor Profile</th>
                <th className="px-6 py-4">Subject Specialties</th>
                <th className="px-6 py-4">Experience Rate</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Synchronizing featured expert directory...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : tutors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Star className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Tutors Cataloged
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tutors.map((tutor) => (
                  <FeaturedTutorRow
                    key={tutor.id}
                    tutor={tutor}
                    onToggleFeature={handleToggleFeature}
                    isActionLoading={isActionLoading}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
