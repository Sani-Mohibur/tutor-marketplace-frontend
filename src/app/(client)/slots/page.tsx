"use client";

import { useState, useEffect } from "react";
import { SlotsHeader } from "@/components/slots/SlotsHeader";
import { SlotTabsFilter } from "@/components/slots/SlotTabsFilter";
import { SlotListCard } from "@/components/slots/SlotListCard";
import { SlotData } from "@/components/slots/types";
import { ShieldAlert, Loader2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function SlotsManagementPage() {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTutorSlotsFeed = async () => {
    try {
      setIsLoading(true);
      const slotsRes = await fetch(`${API_BASE}/availability/my-slots`, {
        credentials: "include",
      });
      const slotsJson = await slotsRes.json();
      if (slotsJson.success) {
        setSlots(slotsJson.data || []);
      }
    } catch (err) {
      console.error("Error syncing availability list metrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorSlotsFeed();
  }, []);

  const filteredSlots = slots.filter((item) => {
    const isFutureInstance = new Date(item.slot) > new Date();
    return activeTab === "upcoming" ? isFutureInstance : !isFutureInstance;
  });

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-8">
      {/* Exact Match Header Component */}
      <SlotsHeader />

      {/* Type-Safe Timeline Tabs and Feed list */}
      <div className="space-y-6">
        <SlotTabsFilter activeTab={activeTab} setActiveTab={setActiveTab} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs font-medium">
              Synchronizing appointment feeds...
            </span>
          </div>
        ) : filteredSlots.length === 0 ? (
          <div className="bg-card border border-border/60 rounded-2xl p-16 text-center text-muted-foreground max-w-md mx-auto space-y-3 shadow-xs">
            <ShieldAlert className="w-8 h-8 text-muted-foreground/50 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">
                No matching slots cataloged
              </p>
              <p className="text-xs">
                You don't have any sessions listed inside this specific
                chronological window.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSlots.map((slotItem) => (
              <SlotListCard
                key={slotItem.id}
                slotData={slotItem}
                apiBase={API_BASE}
                onRefresh={fetchTutorSlotsFeed}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
