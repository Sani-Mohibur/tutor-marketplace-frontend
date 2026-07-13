"use client";

import { useState, useEffect } from "react";
import { Loader2, Ban, Star, MessageSquare, UserPlus, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ROLES } from "@/constants/roles";
import { Pagination } from "@/components/shared/Pagination";

interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  isFeatured: boolean;
  isPlaceholder: boolean;
  placeholderName: string | null;
  studentProfile: { user: { name: string } } | null;
  tutorProfile: { user: { name: string } };
  createdAt: string;
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tutors, setTutors] = useState<any[]>([]);

  // Placeholder form state
  const [isAddingPlaceholder, setIsAddingPlaceholder] = useState(false);
  const [tutorProfileId, setTutorProfileId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [placeholderName, setPlaceholderName] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10"
      });

      const res = await fetch(`${apiBase}/reviews/admin/all?${queryParams}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setReviews(json.data || []);
        setMeta(json.meta || null);
      }
    } catch (err) {
      console.error("Failed fetching reviews:", err);
      toast.error("Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTutors = async () => {
    try {
      const res = await fetch(`${apiBase}/tutor/search?limit=100`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setTutors(json.data || []);
      }
    } catch (err) {
      console.error("Failed fetching tutors:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleToggleFeature = async (id: string) => {
    try {
      const res = await fetch(`${apiBase}/reviews/admin/${id}/feature`, {
        method: "PATCH",
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Featured status updated");
        fetchReviews();
      } else {
        toast.error(json.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Feature toggle error:", err);
      toast.error("Network error.");
    }
  };

  const handleAddPlaceholder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorProfileId || !placeholderName.trim() || !comment.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiBase}/reviews/admin/placeholder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorProfileId,
          rating,
          comment,
          placeholderName,
        }),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Placeholder review added successfully");
        setIsAddingPlaceholder(false);
        setTutorProfileId("");
        setRating(5);
        setComment("");
        setPlaceholderName("");
        fetchReviews();
      } else {
        toast.error(json.message || "Failed to add review.");
      }
    } catch (err) {
      console.error("Add placeholder error:", err);
      toast.error("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Review Management
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage all platform reviews, toggle featured status, or create placeholder reviews.
        </p>
      </div>

      {session?.user?.role !== ROLES.SUPPORT_ADMIN && (
        isAddingPlaceholder ? (
          <div className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm w-full xl:w-2/3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-foreground flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-primary" /> Create Placeholder Review
            </h2>
            <button
              onClick={() => setIsAddingPlaceholder(false)}
              className="text-xs text-muted-foreground hover:text-foreground font-bold flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>

          <form onSubmit={handleAddPlaceholder} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Select Tutor <span className="text-red-500">*</span>
                </label>
                <select
                  value={tutorProfileId}
                  onChange={(e) => setTutorProfileId(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/40 transition-colors"
                >
                  <option value="">-- Choose Tutor --</option>
                  {tutors.map((tutor) => (
                    <option key={tutor.id} value={tutor.id}>
                      {tutor.user?.name || "Unknown Tutor"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Reviewer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={placeholderName}
                  onChange={(e) => setPlaceholderName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Rating (1-5) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Review text..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/40 transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Submit Placeholder
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingPlaceholder(true)}
          className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <UserPlus className="w-4 h-4" /> Add Placeholder Review
        </button>
      ))}

      {/* Main Table Layout */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-4 whitespace-nowrap">Reviewer</th>
                <th className="px-4 py-4 whitespace-nowrap">Tutor</th>
                <th className="px-4 py-4 whitespace-nowrap">Rating / Comment</th>
                <th className="px-4 py-4 whitespace-nowrap">Status</th>
                <th className="px-4 py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">Fetching reviews...</p>
                    </div>
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Ban className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">No Reviews Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-4 font-black">
                      {review.isPlaceholder ? (
                        <span className="flex items-center gap-1">
                          {review.placeholderName} <span className="text-[9px] font-medium text-muted-foreground">(Placeholder)</span>
                        </span>
                      ) : (
                        review.studentProfile?.user?.name || "Unknown"
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {review.tutorProfile?.user?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-4 max-w-[250px]">
                      <div className="flex items-center text-yellow-500 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">{review.comment || "-"}</p>
                    </td>
                    <td className="px-4 py-4">
                      {review.isFeatured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/10 text-yellow-600 font-bold text-[9px] whitespace-nowrap">
                          <Star className="w-2.5 h-2.5 fill-yellow-500" /> Featured
                        </span>
                      ) : (
                        <span className="text-muted-foreground/60 text-[9px] font-bold">Standard</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleToggleFeature(review.id)}
                        className={`h-7 px-2.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ml-auto ${
                          review.isFeatured
                            ? "border-yellow-500/30 text-yellow-600 hover:bg-yellow-500/10"
                            : "border-border/50 text-foreground hover:bg-muted"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${review.isFeatured ? "fill-yellow-500" : ""}`} />
                        {review.isFeatured ? "Unfeature" : "Feature"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrated Shared Pagination Footer Layout */}
      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
      )}
    </div>
  );
}
