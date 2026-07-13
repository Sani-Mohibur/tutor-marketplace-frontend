"use client";

import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  FolderPlus,
  Trash2,
  Ban,
  Edit2,
  Star,
  CheckCircle2,
  X,
  BookOpen,
  GraduationCap,
  Brain,
  Lightbulb,
  Code,
  Laptop,
  Database,
  Cpu,
  Globe,
  MessageSquare,
  Users,
  Languages,
  Briefcase,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ROLES } from "@/constants/roles";
import { Pagination } from "@/components/shared/Pagination";

interface CategoryData {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  isFeatured: boolean;
}

const ICON_OPTIONS = [
  { name: "BookOpen", icon: BookOpen, color: "text-blue-500" },
  { name: "GraduationCap", icon: GraduationCap, color: "text-emerald-500" },
  { name: "Brain", icon: Brain, color: "text-purple-500" },
  { name: "Lightbulb", icon: Lightbulb, color: "text-amber-500" },
  { name: "Code", icon: Code, color: "text-cyan-500" },
  { name: "Laptop", icon: Laptop, color: "text-indigo-500" },
  { name: "Database", icon: Database, color: "text-rose-500" },
  { name: "Cpu", icon: Cpu, color: "text-teal-500" },
  { name: "Globe", icon: Globe, color: "text-sky-500" },
  { name: "MessageSquare", icon: MessageSquare, color: "text-pink-500" },
  { name: "Users", icon: Users, color: "text-orange-500" },
  { name: "Languages", icon: Languages, color: "text-fuchsia-500" },
  { name: "Briefcase", icon: Briefcase, color: "text-yellow-600" },
  { name: "TrendingUp", icon: TrendingUp, color: "text-lime-600" },
  { name: "Target", icon: Target, color: "text-red-500" },
  { name: "Award", icon: Award, color: "text-yellow-500" },
];

export default function AdminCategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10"
      });

      const res = await fetch(`${apiBase}/admin/categories?${queryParams}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setCategories(json.data || []);
        setMeta(json.meta || null);
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
  }, [currentPage]);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setIcon("");
    setIconFile(null);
    setIconPreview(null);
    setIsFeatured(false);
    setIsIconPickerOpen(false);
  };

  const handleEdit = (cat: CategoryData) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || "");
    setIcon(cat.icon || "");
    setIconFile(null);
    setIconPreview(null);
    setIsFeatured(cat.isFeatured);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user?.role === ROLES.SUPPORT_ADMIN) {
      toast.error("You don't have permission to perform this action.");
      return;
    }
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (description && description.length > 100) {
      toast.error("Description must be 100 characters or less.");
      return;
    }

    try {
      setIsSubmitting(true);
      const url = editingId
        ? `${apiBase}/admin/categories/${editingId}`
        : `${apiBase}/admin/categories`;
      const method = editingId ? "PATCH" : "POST";

      const formData = new FormData();
      formData.append("name", name.trim());
      if (description) formData.append("description", description.trim());
      // If a file is selected, we clear the text icon so it uploads correctly, or we can just send it
      if (icon && !iconFile) formData.append("icon", icon);
      formData.append("isFeatured", isFeatured.toString());
      if (iconFile) formData.append("iconFile", iconFile);

      const res = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success(
          editingId ? "Category updated successfully" : "Category created successfully"
        );
        resetForm();
        fetchCategories();
      } else {
        toast.error(json.message || "Failed to save category.");
      }
    } catch (err) {
      console.error("Category save error:", err);
      toast.error("Network communication failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (session?.user?.role === ROLES.SUPPORT_ADMIN) {
      toast.error("You don't have permission to perform this action.");
      return;
    }
    try {
      setIsDeletingId(id);
      const res = await fetch(`${apiBase}/admin/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Category deleted successfully");
        if (editingId === id) resetForm();
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

  const selectedIconData = ICON_OPTIONS.find((i) => i.name === icon);
  const SelectedIconComp = selectedIconData?.icon;
  const selectedIconColor = selectedIconData?.color || "text-primary";

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Platform Category Maintenance
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Add, edit, or remove subject categories. Featured categories appear on the homepage.
        </p>
      </div>

      {/* Category Creation / Edit Form */}
      <div className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm w-full xl:w-2/3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-foreground flex items-center gap-2">
            {editingId ? (
              <>
                <Edit2 className="w-4 h-4 text-emerald-500" /> Edit Category
              </>
            ) : (
              <>
                <FolderPlus className="w-4 h-4 text-primary" /> Create New Category
              </>
            )}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-xs text-muted-foreground hover:text-foreground font-bold flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., System Design"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/40 transition-colors disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Icon (Optional)
              </label>
              <div
                onClick={() => !isSubmitting && setIsIconPickerOpen(!isIconPickerOpen)}
                className={`w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium flex items-center justify-between cursor-pointer transition-colors ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:border-primary/40"
                }`}
              >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {iconPreview || (icon && icon.startsWith("http")) ? (
                      <img src={iconPreview || icon} alt="Icon" className="w-4 h-4 object-contain rounded-sm shrink-0" />
                    ) : SelectedIconComp ? (
                      <SelectedIconComp className={`w-4 h-4 shrink-0 ${selectedIconColor}`} />
                    ) : (
                      <span className="text-muted-foreground/50 italic text-xs shrink-0">No icon selected</span>
                    )}
                    <span className="truncate max-w-[100px] sm:max-w-[140px] text-xs">
                      {iconFile ? iconFile.name : (icon && !icon.startsWith("http") ? icon : (icon ? "Custom Image" : ""))}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-bold shrink-0 ml-2">Pick</div>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setIconFile(file);
                    setIcon("");
                    const reader = new FileReader();
                    reader.onloadend = () => setIconPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Icon Picker Dropdown */}
              {isIconPickerOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border border-border/50 shadow-xl rounded-xl z-20 grid grid-cols-3 sm:grid-cols-4 gap-2 h-56 overflow-y-auto">
                  <div className="col-span-full flex gap-2 mb-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIcon("");
                        setIconFile(null);
                        setIconPreview(null);
                        setIsIconPickerOpen(false);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="flex-1 p-2 text-center text-[11px] font-bold text-red-500 border border-red-500/40 hover:text-red-600 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                    >
                      Clear Icon
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsIconPickerOpen(false);
                        fileInputRef.current?.click();
                      }}
                      className="flex-1 p-2 text-center text-[11px] font-bold text-foreground border border-border/60 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                    >
                      Upload Icon
                    </button>
                  </div>
                  {ICON_OPTIONS.map((opt) => (
                    <div
                      key={opt.name}
                      onClick={() => {
                        setIcon(opt.name);
                        setIconFile(null);
                        setIconPreview(null);
                        setIsIconPickerOpen(false);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all ${
                        icon === opt.name && !iconFile
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <opt.icon className={`w-5 h-5 mb-1 ${opt.color}`} />
                      <span className="text-[9px] truncate w-full text-center">{opt.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Description (Optional)
              </label>
              <span
                className={`text-[10px] font-bold ${
                  description.length > 100 ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {description.length} / 100
              </span>
            </div>
            <textarea
              placeholder="Short description for the category card (max 100 chars)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={2}
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary/40 transition-colors disabled:opacity-60 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                disabled={isSubmitting}
                className="w-4.5 h-4.5 rounded border-muted-foreground/50 text-yellow-500 focus:ring-yellow-500/40 bg-slate-50 dark:bg-slate-900 disabled:opacity-50 cursor-pointer"
              />
              <span className="text-sm font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                <Star className={`w-4.5 h-4.5 ${isFeatured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                Feature on Homepage
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || description.length > 100}
              className="w-full sm:w-auto h-11 sm:h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-xs font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingId ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <FolderPlus className="w-4 h-4" />
              )}
              {editingId ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>

      {/* Main Flat Table List Layout */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Category Details</th>
                <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Featured</th>
                <th className="px-4 sm:px-6 py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Fetching platform categories...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12">
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
                  const rowIconData = category.icon ? ICON_OPTIONS.find((i) => i.name === category.icon) : null;
                  const RowIcon = rowIconData?.icon;
                  const rowIconColor = rowIconData?.color || "text-primary";

                  return (
                    <tr
                      key={category.id}
                      className="hover:bg-muted/10 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {category.icon && category.icon.startsWith("http") ? (
                            <img src={category.icon} alt={category.name} className="w-8 h-8 rounded-lg object-cover border border-border/50 shadow-sm" />
                          ) : RowIcon ? (
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <RowIcon className={`w-4 h-4 ${rowIconColor}`} />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                              <FolderPlus className="w-4 h-4 opacity-50" />
                            </div>
                          )}
                          <div>
                            <p className="font-black text-foreground capitalize text-sm">
                              {category.name}
                            </p>
                            {category.description && (
                              <p className="text-[10px] text-muted-foreground truncate max-w-[180px] sm:max-w-xs mt-0.5">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {category.isFeatured ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold text-[10px] whitespace-nowrap">
                            <Star className="w-3 h-3 fill-yellow-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 text-[10px] font-bold">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(category)}
                            disabled={isDeletingId !== null || editingId === category.id}
                            className="h-7 px-2.5 rounded-lg border border-border/50 hover:bg-muted text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            disabled={isDeletingId !== null}
                            onClick={() => handleDeleteCategory(category.id)}
                            className="h-7 px-2.5 rounded-lg border border-border/50 hover:bg-red-500/10 hover:text-red-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
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
