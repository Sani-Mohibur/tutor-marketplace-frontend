"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Users,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SlotData } from "@/components/slots/types";

interface TutorBookingRowProps {
  slotData: SlotData;
  apiBase: string;
  onRefresh: () => void;
}

export function TutorBookingRow({
  slotData,
  apiBase,
  onRefresh,
}: TutorBookingRowProps) {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState(false);

  const slotTime = new Date(slotData.slot);
  const isTimeReached = new Date() >= slotTime;

  // Check if this specific slot has been marked completed by looking at its backend data state
  // (We check slotData.status or fallback safely if your backend array tracks it there)
  const isAlreadyCompleted = slotData.status === "completed";

  const handleMarkComplete = async () => {
    try {
      setIsCompleting(true);
      const res = await fetch(`${apiBase}/bookings/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availabilityId: slotData.id }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Session completed successfully!");
        onRefresh();
      } else {
        toast.error(json.message || "Failed to complete booking.");
      }
    } catch (err) {
      console.error("Complete session error:", err);
      toast.error("Runtime connectivity issue occurred.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all relative overflow-hidden">
      {/* Left Segment: Meta Content Info */}
      <div className="space-y-2 flex-1 w-full">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
              isAlreadyCompleted
                ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20"
                : isTimeReached
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20"
            }`}
          >
            {isAlreadyCompleted
              ? "Completed Session"
              : isTimeReached
                ? "Awaiting Closure"
                : "Upcoming Schedule"}
          </span>
        </div>

        <div>
          <h4 className="font-bold text-sm text-foreground tracking-tight">
            {slotData.title || "Untitled Availability Session"}
          </h4>
          <p className="text-xs text-primary font-semibold">
            {slotData.subject || "General Engineering"}
          </p>
        </div>

        {slotData.location && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate max-w-sm">{slotData.location}</span>
          </div>
        )}
      </div>

      {/* Middle Segment: Calendar & Pricing */}
      <div className="grid grid-cols-2 md:flex md:items-center gap-x-4 gap-y-2 text-xs text-muted-foreground border-t md:border-t-0 pt-3 md:pt-0 border-slate-300 dark:border-slate-800 w-full md:w-auto">
        <div className="flex items-center gap-1.5 min-w-[140px]">
          <Calendar className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
          <span>{slotTime.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1.5 min-w-[80px]">
          <Clock className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
          <span>{slotData.timeDuration || "60"} Mins</span>
        </div>

        <div className="flex items-center gap-1.5 col-span-2 md:col-span-1 text-foreground font-semibold bg-slate-200/40 dark:bg-slate-800/40 px-2.5 py-1 rounded-xl border border-slate-300/40 dark:border-slate-800/50">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500 shrink-0" />
          <span>
            Total: $
            {(
              (slotData.pricePerHour || 0) *
              (parseFloat(slotData.timeDuration || "60") / 60)
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Right Segment: Action Triggers */}
      <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-300 dark:border-slate-800 justify-end">
        <button
          type="button"
          onClick={() => router.push(`/bookings/${slotData.id}/students`)}
          className="h-9 px-3 rounded-xl bg-background border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Users className="w-3.5 h-3.5" /> Attendees
        </button>

        {isAlreadyCompleted ? (
          <span className="h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 select-none">
            Finished
          </span>
        ) : (
          <button
            type="button"
            disabled={!isTimeReached || isCompleting}
            onClick={handleMarkComplete}
            title={
              !isTimeReached
                ? "Cannot complete prior to calendar scheduled session timestamp."
                : "Mark as completed"
            }
            className="h-9 px-3 rounded-xl bg-emerald-500 dark:bg-blue-600 text-white hover:opacity-95 text-xs font-bold flex items-center gap-1.5 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />{" "}
            {isCompleting ? "Processing..." : "Complete"}
          </button>
        )}
      </div>
    </div>
  );
}
