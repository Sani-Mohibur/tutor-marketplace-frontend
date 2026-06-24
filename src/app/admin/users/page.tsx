"use client";

import { useState, useEffect } from "react";
import { Loader2, Users } from "lucide-react";
import { UserFilterBar } from "@/components/admin/users/UserFilterBar";
import { UserRow } from "@/components/admin/users/UserRow";
import { Pagination } from "@/components/shared/Pagination";

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  banned: boolean;
  createdAt: string;
}

interface MetaData {
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
}

export default function AdminUserDirectoryPage() {
  // State Matrix
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  // Filter & Pagination States
  const [activeTab, setActiveTab] = useState<
    "all" | "tutor" | "student" | "admin"
  >("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "true" | "false">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  // Fetch Accounts Matrix
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchQuery,
        role: activeTab,
        banned: statusFilter,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      const res = await fetch(`${apiBase}/admin/users?${queryParams}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setUsers(json.data || []);
        setMeta(json.meta || null);
      }
    } catch (err) {
      console.error("Failed fetching account listings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to page 1 whenever filters change to avoid empty data state splits
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, searchQuery]);

  // Synchronize on page or filter mutation boundaries
  useEffect(() => {
    fetchUsers();
  }, [currentPage, activeTab, statusFilter, searchQuery]);

  // Handle Ban / Unban Toggle Action Operations
  const handleToggleBan = async (userId: string, currentBanStatus: boolean) => {
    try {
      setIsActionLoading(userId);
      const res = await fetch(`${apiBase}/admin/users/${userId}/ban`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ banned: !currentBanStatus }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        // Refresh local items seamlessly
        fetchUsers();
      }
    } catch (err) {
      console.error("Action transmission aborted:", err);
    } finally {
      setIsActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 w-full animate-fade-in">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            User Accounts Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Search, filter, inspect, and manage authorization levels or
            operational states for all platform members.
          </p>
        </div>
      </div>

      {/* Filter Component Toolbar Context */}
      <UserFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* User Records Table Container */}
      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Account Holder</th>
                <th className="px-6 py-4">Security Role</th>
                <th className="px-6 py-4">Platform State</th>
                <th className="px-6 py-4">Enrolled Date</th>
                <th className="px-6 py-4 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Synchronizing master user directory ledger...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Users className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Records Matching Filters
                      </p>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Adjust your structural parameters or search values to
                        fetch matrix instances.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onToggleBan={handleToggleBan}
                    isActionLoading={isActionLoading}
                  />
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
