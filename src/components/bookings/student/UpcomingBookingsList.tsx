"use client";

import { CalendarDays } from "lucide-react";
import { BookingCard, BookingData } from "./BookingCard";

interface UpcomingBookingsListProps {
  bookings: BookingData[];
  onCancelBooking: (id: string) => Promise<void>;
  onPayNow?: (bookingId: string) => Promise<void>;
  isLoading: boolean;
}

export function UpcomingBookingsList({
  bookings,
  onCancelBooking,
  onPayNow,
  isLoading,
}: UpcomingBookingsListProps) {
  // Filters to ensure any pending class whose time hasn't passed is included
  const upcomingList = bookings.filter((b) => {
    const isPendingStatus = b.status === "pending";
    const isFutureSlot = b.availability?.slot
      ? new Date(b.availability.slot) > new Date()
      : true; // fallback to true if slot layout is nested differently

    return isPendingStatus && isFutureSlot;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((n) => (
          <div key={n} className="h-36 bg-muted/60 rounded-xl" />
        ))}
      </div>
    );
  }

  if (upcomingList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border/60 rounded-xl bg-muted/10 text-center">
        <CalendarDays className="w-8 h-8 text-muted-foreground/50 mb-3" />
        <p className="text-xs font-semibold text-muted-foreground">
          No upcoming scheduled sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {upcomingList.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancelBooking}
          onPayNow={onPayNow}
          // The details (location, price, title) will render fully inside your card component
        />
      ))}
    </div>
  );
}
