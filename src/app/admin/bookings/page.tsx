"use client";

import { useState, useEffect } from "react";
import { Loader2, CalendarX, CalendarDays, Mail } from "lucide-react";
import { Pagination } from "@/components/shared/Pagination";

interface BookingData {
  id: string;
  createdAt: string;
  availability: {
    slot: string;
    timeDuration: string | null;
  };
  studentProfile: {
    user: {
      name: string;
      email: string;
    };
  };
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
  totalBookings: number;
  totalPages: number;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      const res = await fetch(`${apiBase}/admin/bookings?${queryParams}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setBookings(json.data || []);
        setMeta(json.meta || null);
      }
    } catch (err) {
      console.error("Failed fetching master booking registry:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Platform Booking Log Registry
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Complete structural audit log tracking historical and upcoming
          educational sessions arranged between platform members.
        </p>
      </div>

      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Student Profile</th>
                <th className="px-6 py-4">Assigned Tutor</th>
                <th className="px-6 py-4">Session Schedule Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Synchronizing global transaction ledger records...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <CalendarX className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Bookings Processed On Platform
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    {/* Student Identity Cell */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="font-black text-foreground">
                          {booking.studentProfile?.user?.name ||
                            "Deleted Student"}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                          <Mail className="w-3 h-3 text-muted-foreground/60" />
                          {booking.studentProfile?.user?.email}
                        </div>
                      </div>
                    </td>

                    {/* Tutor Identity Cell */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="font-black text-foreground">
                          {booking.tutorProfile?.user?.name ||
                            "Deleted Instructor"}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                          <Mail className="w-3 h-3 text-muted-foreground/60" />
                          {booking.tutorProfile?.user?.email}
                        </div>
                      </div>
                    </td>

                    {/* Date Time Duration Metrics Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <CalendarDays className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                        <div className="space-y-0.5 font-medium">
                          <div className="text-foreground font-bold">
                            {new Date(
                              booking.availability?.slot,
                            ).toLocaleDateString(undefined, {
                              dateStyle: "medium",
                            })}
                          </div>
                          <div className="text-[11px]">
                            {new Date(
                              booking.availability?.slot,
                            ).toLocaleTimeString(undefined, {
                              timeStyle: "short",
                            })}{" "}
                            ({booking.availability?.timeDuration || "60"} Mins)
                          </div>
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
