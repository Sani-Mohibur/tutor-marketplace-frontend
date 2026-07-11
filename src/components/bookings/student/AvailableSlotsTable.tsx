"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  Star,
  DollarSign,
  Clock,
  BookOpen,
  MapPin,
  CreditCard,
  Banknote,
} from "lucide-react";

export interface SlotData {
  id: string;
  title: string | null;
  subject: string | null;
  details: string | null;
  location: string | null;
  slot: string;
  timeDuration: string | null;
  pricePerHour: number | 0;
  paymentMethod: string; // "cash" | "stripe" | "both"
  tutorProfile: {
    title: string;
    pricePerHour: number;
    rating: number;
    reviewCount: number;
    skills: string[];
    user: {
      name: string;
    };
  };
}

interface AvailableSlotsTableProps {
  slots: SlotData[];
  onBookSlot: (slotId: string, paymentMethod: string) => Promise<void>;
  isLoading: boolean;
}

export function AvailableSlotsTable({
  slots,
  onBookSlot,
  isLoading,
}: AvailableSlotsTableProps) {
  // Track loading per specific row instead of a global transition boolean
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleBookingClick = async (id: string) => {
    setBookingId(id);
    try {
      const slot = slots.find((s) => s.id === id);
      await onBookSlot(id, slot?.paymentMethod || "cash");
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

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 border border-dashed border-border/60 rounded-2xl bg-gradient-to-b from-muted/10 to-emerald-500/5 dark:to-blue-500/5 text-center">
        <Calendar className="w-9 h-9 text-emerald-500/40 dark:text-blue-500/40 mb-2" />
        <p className="text-xs font-semibold text-muted-foreground">
          No upcoming open slots available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 dark:border-border/40 rounded-2xl overflow-hidden shadow-sm bg-gradient-to-b from-background via-background to-emerald-500/5 dark:to-blue-500/5">
      <div className="w-full">
        <table className="w-full text-left border-collapse block md:table md:min-w-[650px]">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gradient-to-r from-muted/50 via-muted/30 to-muted/20 backdrop-blur border-b border-border/40 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="p-4 pl-5">
                <User className="w-3 h-3 inline mr-1" /> Tutor Details
              </th>
              <th className="p-4">
                <BookOpen className="w-3 h-3 inline mr-1" /> Session Topic
              </th>
              <th className="p-4">
                <Calendar className="w-3 h-3 inline mr-1" /> Schedule & Rate
              </th>
              <th className="p-4 text-right pr-5">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/30 text-xs block md:table-row-group">
            {slots.map((item) => {
              const dateObj = new Date(item.slot);
              const hasRating = item.tutorProfile.reviewCount > 0;
              const isCurrentRowBooking = bookingId === item.id;

              return (
                <tr
                  key={item.id}
                  className="group hover:bg-emerald-500/5 dark:hover:bg-blue-500/5 hover:shadow-sm transition-all duration-200 block md:table-row p-5 md:p-0"
                >
                  {/* Tutor Details */}
                  <td className="p-0 md:p-4 md:pl-5 space-y-1 block md:table-cell max-w-full md:max-w-[220px] mb-4 md:mb-0">
                    <div className="font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 dark:group-hover:from-blue-600 dark:group-hover:to-cyan-500 transition-all">
                      {item.tutorProfile.user.name}
                    </div>

                    <div className="text-[11px] text-muted-foreground font-medium truncate">
                      {item.tutorProfile.title}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tutorProfile.skills
                        .slice(0, 2)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </td>

                  {/* Session Topic */}
                  <td className="p-0 md:p-4 space-y-1.5 block md:table-cell max-w-full md:max-w-[280px] mb-4 md:mb-0">
                    <div className="font-semibold text-foreground line-clamp-1">
                      {item.title || "Custom Architecture Sync Session"}
                    </div>

                    <p className="text-[11px] text-muted-foreground/80 line-clamp-2">
                      {item.details ||
                        "Tailored project timeline analysis, live optimization walkthroughs, and clean code review targets."}
                    </p>

                    <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-white/5 backdrop-blur border border-border/30 rounded-full px-2 py-1 w-fit">
                      <MapPin className="w-3 h-3 text-emerald-500 dark:text-blue-500" />
                      <span className="truncate">
                        {item.location || "Remote (Google Meet / Zoom)"}
                      </span>
                    </div>
                  </td>

                  {/* Schedule & Rate */}
                  <td className="p-0 md:p-4 space-y-1.5 block md:table-cell mb-4 md:mb-0">
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
                      <span className="flex items-center gap-0.5 font-bold px-2 py-1 rounded-full bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20">
                        <DollarSign className="w-3 h-3" />
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

                      <span className="flex items-center gap-0.5 font-semibold">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {hasRating
                          ? item.tutorProfile.rating.toFixed(1)
                          : "New"}
                      </span>

                      <span className={`flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-full text-[9px] border ${item.paymentMethod === "stripe"
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
                        : item.paymentMethod === "both"
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                          : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
                        }`}>
                        {item.paymentMethod === "stripe" || item.paymentMethod === "both" ? (
                          <CreditCard className="w-2.5 h-2.5" />
                        ) : (
                          <Banknote className="w-2.5 h-2.5" />
                        )}
                        {item.paymentMethod === "both" ? "Cash/Stripe" : item.paymentMethod === "stripe" ? "Stripe" : "Cash"}
                      </span>
                    </div>
                  </td>

                  {/* Action Trigger Button */}
                  <td className="p-0 md:p-4 text-left md:text-right md:pr-5 block md:table-cell pt-2 md:pt-0">
                    <button
                      type="button"
                      disabled={bookingId !== null}
                      onClick={() => handleBookingClick(item.id)}
                      className="w-full md:w-auto px-4 py-2 text-[11px] font-bold text-white rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 dark:from-blue-600 dark:to-cyan-500 dark:hover:from-blue-500 dark:hover:to-cyan-400 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-[1.03] cursor-pointer"
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
