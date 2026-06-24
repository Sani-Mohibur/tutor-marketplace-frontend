"use client";

import { useState, useEffect } from "react";
import { Loader2, ShieldCheck, ShieldAlert, Search } from "lucide-react";
import { toast } from "sonner";
import { Pagination } from "@/components/shared/Pagination";

interface TutorData {
  id: string;
  isVerified: boolean;
  user: {
    name: string;
    email: string;
  };
}

interface MetaData {
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminVerificationsPage() {
  const [tutors, setTutors] = useState<TutorData[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"all" | "verified" | "unverified">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchTutors = async () => {
    try {
      setIsLoading(true);

      let isVerifiedParam = "all";
      if (activeTab === "verified") isVerifiedParam = "true";
      if (activeTab === "unverified") isVerifiedParam = "false";

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchQuery,
        isVerified: isVerifiedParam,
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
      console.error("Failed fetching tutor verification directory:", err);
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

  const handleToggleVerify = async (
    tutorId: string,
    currentVerificationStatus: boolean,
  ) => {
    try {
      setIsActionLoading(tutorId);
      const nextState = !currentVerificationStatus;

      const res = await fetch(`${apiBase}/admin/tutors/${tutorId}/verify`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVerified: nextState }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success(
          nextState
            ? "Tutor verified successfully"
            : "Verification credentials revoked",
        );
        fetchTutors();
      } else {
        toast.error(
          json.message || "Failed to alter background clearance state.",
        );
      }
    } catch (err) {
      console.error("Verification adjustment network block:", err);
      toast.error("Network communication failure.");
    } finally {
      setIsActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Tutor Verification Dashboard
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review credentials and authorize trusted platform instructors to
          guarantee educational quality control boundaries.
        </p>
      </div>

      {/* Embedded Filter & Search Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card border border-black/5 dark:border-white/5 p-4 rounded-xl shadow-xs">
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full sm:w-auto">
          {(["all", "verified", "unverified"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none text-xs font-bold px-4 py-2 rounded-lg capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tutor name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-black/5 dark:border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-hidden focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      {/* Main Streamlined Table Content Block */}
      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Tutor Profile Details</th>
                <th className="px-6 py-4">Standing Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Loading verification catalog records...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : tutors.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <ShieldAlert className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Tutors Found matching filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tutors.map((tutor) => {
                  const isMutating = isActionLoading === tutor.id;
                  return (
                    <tr
                      key={tutor.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="font-black text-foreground">
                            {tutor.user?.name || "Unknown Identity"}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono">
                            {tutor.user?.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center text-[10px] font-black tracking-wide px-2 py-0.5 rounded border capitalize ${
                            tutor.isVerified
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          }`}
                        >
                          {tutor.isVerified
                            ? "Verified Approved"
                            : "Unverified Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <button
                            disabled={isMutating}
                            onClick={() =>
                              handleToggleVerify(tutor.id, tutor.isVerified)
                            }
                            className={`h-7 px-3 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50 ${
                              tutor.isVerified
                                ? "border-black/10 dark:border-white/10 hover:bg-rose-500/10 hover:text-rose-600 text-foreground"
                                : "border-primary/20 bg-primary/5 hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/20 text-foreground"
                            }`}
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {isMutating
                              ? "Updating..."
                              : tutor.isVerified
                                ? "Revoke Verification"
                                : "Grant Verification"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
