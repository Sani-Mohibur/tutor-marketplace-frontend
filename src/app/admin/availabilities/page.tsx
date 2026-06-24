"use client";

import { useState, useEffect } from "react";
import { Loader2, Clock, CalendarDays, DollarSign, Ban } from "lucide-react";
import { Pagination } from "@/components/shared/Pagination";

interface AvailabilityData {
  id: string;
  title: string | null;
  subject: string | null;
  details: string | null;
  location: string | null;
  slot: string;
  timeDuration: string | null;
  pricePerHour: number | null;
  status: string;
  isBooked: boolean;
  tutorProfile: {
    user: {
      name: string;
      email: string;
    };
  };
}

interface MetaData {
  page: number;
  limit: number;
  totalAvailabilities: number;
  totalPages: number;
}

export default function AdminAvailabilitiesPage() {
  const [availabilities, setAvailabilities] = useState<AvailabilityData[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchAvailabilities = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      const res = await fetch(
        `${apiBase}/admin/availabilities?${queryParams}`,
        {
          credentials: "include",
        },
      );
      const json = await res.json();
      if (json.success) {
        setAvailabilities(json.data || []); // Fixed typo from setBookings to setAvailabilities
        setMeta(json.meta || null);
      }
    } catch (err) {
      console.error("Failed fetching master availability pool:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
  }, [currentPage]);

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Platform Availabilities Master Registry
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor all slot allocations, session pricing configurations, and
          schedule bounds published across tutor networks.
        </p>
      </div>

      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Tutor Profile</th>
                <th className="px-6 py-4">Session Subject Details</th>
                <th className="px-6 py-4">Schedule & Rate Bounds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Synchronizing global availability matrices...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : availabilities.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Ban className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Availability Slots Listed
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                availabilities.map((slotItem) => (
                  <tr
                    key={slotItem.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    {/* Column 1: Tutor Identity Focus */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="font-black text-foreground">
                          {slotItem.tutorProfile?.user?.name ||
                            "Unknown Mentor"}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">
                          {slotItem.tutorProfile?.user?.email}
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Topic & Structural Text Details */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 max-w-xs">
                        <div className="font-black text-foreground">
                          {slotItem.subject || "General Content"}
                        </div>
                        <div className="text-[11px] font-medium text-primary/80 truncate">
                          {slotItem.title}
                        </div>
                        {slotItem.details && (
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {slotItem.details}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Column 3: Timing Metrics & Base Pricing */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-foreground">
                          <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>
                            {new Date(slotItem.slot).toLocaleDateString(
                              undefined,
                              { dateStyle: "short" },
                            )}
                          </span>
                          <span className="text-muted-foreground font-normal text-[11px]">
                            {new Date(slotItem.slot).toLocaleTimeString(
                              undefined,
                              { timeStyle: "short" },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />{" "}
                            {slotItem.timeDuration || "60"} Mins
                          </span>
                          <span className="flex items-center text-foreground font-bold">
                            <DollarSign className="w-3 h-3 text-emerald-500" />
                            {slotItem.pricePerHour ?? 0}/hr
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
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
