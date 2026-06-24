"use client";

import { useState, useEffect } from "react";
import { TutorBookingHeader } from "@/components/bookings/tutor/TutorBookingHeader";
import { TutorBookingRow } from "@/components/bookings/tutor/TutorBookingRow";
import { SlotData } from "@/components/slots/types";
import { Loader2, CalendarX, CalendarDays, History } from "lucide-react";

export default function TutorBookingsDashboard() {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchTutorSlots = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiBase}/availability/my-slots`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setSlots(json.data || []);
      }
    } catch (err) {
      console.error("Failed fetching tutor slots:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorSlots();
  }, []);

  // Filter slot objects into respective time lists dynamically
  const upcomingSlots = slots.filter(
    (item) => new Date(item.slot) >= new Date() && item.status !== "completed",
  );
  const pastSlots = slots.filter(
    (item) => new Date(item.slot) < new Date() || item.status === "completed",
  );

  const visibleSlots = activeTab === "upcoming" ? upcomingSlots : pastSlots;

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      <TutorBookingHeader />

      <div className="space-y-6">
        {/* Header and Premium Solid Tabs Segments Layout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Ecosystem Schedule Listings
            </h2>
            <p className="text-xs text-muted-foreground">
              Review status breakdowns, attendee registries, or commit milestone
              wrap-ups.
            </p>
          </div>

          {/* Premium Tab Toggles */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "upcoming"
                  ? "bg-background text-foreground dark:text-blue-400 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" /> Upcoming (
              {upcomingSlots.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "past"
                  ? "bg-background text-foreground dark:text-blue-400 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <History className="w-3.5 h-3.5" /> Past History (
              {pastSlots.length})
            </button>
          </div>
        </div>

        {/* Dynamic Display Canvas */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">
              Synchronizing slot matrices with cloud registry...
            </p>
          </div>
        ) : visibleSlots.length === 0 ? (
          <div className="border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-16 text-center space-y-3 bg-slate-50/40 dark:bg-slate-900/40">
            <div className="p-3 bg-slate-200 dark:bg-slate-800 inline-flex rounded-full text-muted-foreground">
              <CalendarX className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h5 className="font-bold text-sm text-foreground">
                No Slots in This Category
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                There are currently no schedule configurations matches inside
                your {activeTab} timeline matrix.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleSlots.map((item) => (
              <TutorBookingRow
                key={item.id}
                slotData={item}
                apiBase={apiBase}
                onRefresh={fetchTutorSlots}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
