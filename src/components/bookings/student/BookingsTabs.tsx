"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, History, Star, Sparkles } from "lucide-react";

interface BookingsTabsProps {
  renderUpcoming: () => React.ReactNode;
  renderPast: () => React.ReactNode;
  renderReviews: () => React.ReactNode;
  renderAvailableSlots: () => React.ReactNode;
}

const triggerClassName = `
  rounded-xl px-4 py-2.5
  text-sm font-semibold
  text-muted-foreground
  transition-all duration-300
  cursor-pointer
  flex items-center gap-2

  hover:bg-muted/50
  hover:text-foreground

  data-[state=active]:bg-emerald-500/10
  data-[state=active]:text-emerald-600
  dark:data-[state=active]:text-blue-400
  data-[state=active]:shadow-sm
  data-[state=active]:border
  data-[state=active]:border-emerald-500/30
  dark:data-[state=active]:border-blue-500/30
`;

export function BookingsTabs({
  renderUpcoming,
  renderPast,
  renderReviews,
  renderAvailableSlots,
}: BookingsTabsProps) {
  return (
    <Tabs defaultValue="upcoming" className="w-full space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-2">
        <TabsList className="bg-transparent h-auto p-0 gap-2 w-full justify-start overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-none">
          <TabsTrigger value="upcoming" className={triggerClassName}>
            <Calendar className="w-4 h-4" />
            Upcoming Classes
          </TabsTrigger>

          <TabsTrigger value="available" className={triggerClassName}>
            <Sparkles className="w-4 h-4" />
            Available Slots
          </TabsTrigger>

          <TabsTrigger value="past" className={triggerClassName}>
            <History className="w-4 h-4" />
            Completed History
          </TabsTrigger>

          <TabsTrigger value="reviews" className={triggerClassName}>
            <Star className="w-4 h-4" />
            My Reviews
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="upcoming"
        className="outline-hidden animate-in fade-in-50 duration-200"
      >
        {renderUpcoming()}
      </TabsContent>

      <TabsContent
        value="available"
        className="outline-hidden animate-in fade-in-50 duration-200"
      >
        {renderAvailableSlots()}
      </TabsContent>

      <TabsContent
        value="past"
        className="outline-hidden animate-in fade-in-50 duration-200"
      >
        {renderPast()}
      </TabsContent>

      <TabsContent
        value="reviews"
        className="outline-hidden animate-in fade-in-50 duration-200"
      >
        {renderReviews()}
      </TabsContent>
    </Tabs>
  );
}
