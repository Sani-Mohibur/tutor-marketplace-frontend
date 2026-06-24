"use client";

import { BookingCard, BookingData } from "./BookingCard";
import { History } from "lucide-react";

interface PastBookingsListProps {
  bookings: BookingData[];
  onOpenReviewModal: (booking: BookingData) => void;
  isLoading: boolean;
}

export function PastBookingsList({
  bookings,
  onOpenReviewModal,
  isLoading,
}: PastBookingsListProps) {
  const pastList = bookings.filter((b) => b.status === "completed");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((n) => (
          <div key={n} className="h-36 bg-muted/60 rounded-xl" />
        ))}
      </div>
    );
  }

  if (pastList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border/60 rounded-xl bg-muted/10 text-center">
        <History className="w-8 h-8 text-muted-foreground/50 mb-3" />
        <p className="text-xs font-semibold text-muted-foreground">
          No historical completed sessions found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pastList.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onOpenReviewModal={onOpenReviewModal} // Fixed prop name mapping here
        />
      ))}
    </div>
  );
}
