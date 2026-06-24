"use client";

import { useState } from "react";
import { Calendar, Clock, DollarSign, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import { ROLES } from "@/constants/roles";

export interface TutorSlotData {
  id: string;
  title: string | null;
  details: string | null;
  location: string | null;
  slot: string;
  timeDuration: string | null;
  pricePerHour: number | 0;
}

interface TutorAvailableSlotsTableProps {
  slots: TutorSlotData[];
  onBookSlot: (slotId: string) => Promise<void>;
  isLoading: boolean;
  userRole?: string;
}

export function TutorAvailableSlotsTable({
  slots,
  onBookSlot,
  isLoading,
  userRole,
}: TutorAvailableSlotsTableProps) {
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleBookingClick = async (id: string) => {
    setBookingId(id);
    try {
      await onBookSlot(id);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setBookingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 bg-muted/40 rounded-xl" />
        ))}
      </div>
    );
  }

  // Guard Check: Show targeted sign-in prompt if not logged in as a student
  if (userRole !== ROLES.STUDENT) {
    return (
      <div className="flex flex-col items-center justify-center py-10 border border-dashed border-border/60 rounded-2xl bg-muted/10 text-center px-4">
        <Calendar className="w-8 h-8 text-muted-foreground/40 mb-2" />
        <p className="text-xs font-semibold text-muted-foreground max-w-sm leading-relaxed">
          To view and book available upcoming slots, please{" "}
          <Link
            href="/login"
            className="text-emerald-600 dark:text-blue-400 hover:underline font-bold"
          >
            sign in with your student account
          </Link>
          .
        </p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 border border-dashed border-border/60 rounded-2xl bg-muted/10 text-center">
        <Calendar className="w-8 h-8 text-muted-foreground/40 mb-2" />
        <p className="text-xs font-semibold text-muted-foreground">
          No separate upcoming slots listed for this mentor today.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border/40 rounded-2xl overflow-hidden bg-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="p-4 pl-5">
                <BookOpen className="w-3 h-3 inline mr-1" /> Session Topic
              </th>
              <th className="p-4">
                <Calendar className="w-3 h-3 inline mr-1" /> Schedule & Rate
              </th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/30 text-xs">
            {slots.map((item) => {
              const dateObj = new Date(item.slot);
              const isCurrentRowBooking = bookingId === item.id;

              return (
                <tr
                  key={item.id}
                  className="group hover:bg-emerald-500/[0.02] dark:hover:bg-blue-500/[0.02] transition-colors duration-150"
                >
                  {/* Session Topic Column */}
                  <td className="p-4 pl-5 space-y-1 max-w-[320px]">
                    <div className="font-semibold text-foreground line-clamp-1">
                      {item.title || "Custom Architecture Sync Session"}
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 line-clamp-2">
                      {item.details ||
                        "Tailored project timeline analysis, live optimization walkthroughs, and clean code review targets."}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 text-emerald-500 dark:text-blue-500" />
                      <span className="truncate">
                        {item.location || "Remote (Google Meet / Zoom)"}
                      </span>
                    </div>
                  </td>

                  {/* Schedule & Rate Column */}
                  <td className="p-4 space-y-1.5">
                    <div className="font-medium text-foreground">
                      {dateObj.toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}{" "}
                      at{" "}
                      <span className="font-semibold text-muted-foreground">
                        {dateObj.toLocaleTimeString(undefined, {
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-bold text-emerald-600 dark:text-blue-400">
                        <DollarSign className="w-3 h-3" />{" "}
                        {item.pricePerHour !== undefined &&
                        item.pricePerHour !== null &&
                        item.pricePerHour !== 0
                          ? `${item.pricePerHour}/hr`
                          : "Free Session"}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {item.timeDuration
                          ? `${item.timeDuration} mins`
                          : "Flexible"}
                      </span>
                    </div>
                  </td>

                  {/* Action Button */}
                  <td className="p-4 text-right pr-5">
                    <button
                      type="button"
                      disabled={bookingId !== null}
                      onClick={() => handleBookingClick(item.id)}
                      className="px-4 py-2 text-[11px] font-bold text-white rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 dark:from-blue-600 dark:to-cyan-500 dark:hover:from-blue-500 dark:hover:to-cyan-400 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isCurrentRowBooking ? "Booking..." : "Book Class"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
