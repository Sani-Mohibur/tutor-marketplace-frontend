"use client";

import { useState, useEffect } from "react";
import { Loader2, FolderPlus, Trash2, Ban } from "lucide-react";
import { toast } from "sonner";

interface CategoryData {
  id: string;
  name: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      // Fetching from the public tutor router endpoint
      const res = await fetch(`${apiBase}/tutor/categories`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setCategories(json.data || []);
      }
    } catch (err) {
      console.error("Failed fetching categories list:", err);
      toast.error("Failed to load platform categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiBase}/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Category created successfully");
        setNewCategoryName("");
        fetchCategories();
      } else {
        toast.error(json.message || "Failed to create category.");
      }
    } catch (err) {
      console.error("Category creation error:", err);
      toast.error("Network communication failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setIsDeletingId(id);
      const res = await fetch(`${apiBase}/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(json.message || "Failed to drop category.");
      }
    } catch (err) {
      console.error("Category delete execution error:", err);
      toast.error("Network communication failure.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Platform Category Maintenance
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Add or remove subject categories to structure what topics instructors
          can specialize in across the portal.
        </p>
      </div>

      {/* Category Creation Form Component Box */}
      <div className="bg-card border border-black/5 dark:border-white/5 p-5 rounded-2xl shadow-xs max-w-xl">
        <h2 className="text-sm font-black text-foreground mb-3">
          Create New Category
        </h2>
        <form onSubmit={handleCreateCategory} className="flex gap-3">
          <input
            type="text"
            placeholder="e.g., System Design, Node.js..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 bg-slate-50 dark:bg-slate-900/50 border border-black/5 dark:border-white/5 rounded-xl px-4 py-2 text-xs font-medium focus:outline-hidden focus:border-primary/40 transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newCategoryName.trim()}
            className="h-9 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-bold flex items-center gap-1.5 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FolderPlus className="w-3.5 h-3.5" />
            )}
            Add Category
          </button>
        </form>
      </div>

      {/* Main Flat Table List Layout without Pagination boundaries */}
      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden max-w-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Category Name Tag</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Fetching platform tags pool...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Ban className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Categories Registered
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => {
                  const isDeleting = isDeletingId === category.id;
                  return (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-black text-foreground capitalize">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <button
                            disabled={isDeletingId !== null}
                            onClick={() => handleDeleteCategory(category.id)}
                            className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            {isDeleting ? "Dropping..." : "Delete"}
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
    </div>
  );
}
