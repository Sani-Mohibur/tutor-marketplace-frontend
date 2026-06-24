"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Info,
  CheckCircle,
  AlertCircle,
  Star,
  CreditCard,
  Banknote,
  Loader2,
} from "lucide-react";

export interface BookingData {
  id: string;
  status: string;
  paymentStatus?: string; // "unpaid" | "paid" | "cash"
  review?: any; // To determine if already reviewed
  availability: {
    title: string | null;
    subject: string | null;
    details: string | null;
    location: string | null;
    slot: string;
    timeDuration: string | null;
    pricePerHour: number | 0;
    paymentMethod?: string; // "cash" | "stripe" | "both"
    tutorProfile: {
      title: string;
      pricePerHour: number;
      experienceYears: number;
      qualifications: string;
      user: {
        name: string;
      };
    };
  };
}

interface BookingCardProps {
  booking: BookingData;
  onCancel?: (id: string) => Promise<void>;
  onOpenReviewModal?: (booking: BookingData) => void; // Added for completed history actions
  onPayNow?: (bookingId: string) => Promise<void>;
}

export function BookingCard({
  booking,
  onCancel,
  onOpenReviewModal,
  onPayNow,
}: BookingCardProps) {
  const { availability, status } = booking;
  const [showBio, setShowBio] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const slotDate = new Date(availability.slot);
  const durationMins = availability.timeDuration
    ? parseInt(availability.timeDuration, 10)
    : 60;
  const totalCost = availability.pricePerHour * (durationMins / 60);

  const isCompleted = status === "completed";

  const paymentStatus = booking.paymentStatus || "cash";
  const paymentMethod = availability.paymentMethod || "cash";
  const needsStripePayment =
    paymentStatus === "unpaid" &&
    (paymentMethod === "stripe" || paymentMethod === "both");

  // Countdown timer loop (Only runs if active/pending)
  useEffect(() => {
    if (isCompleted) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = slotDate.getTime() - now;

      if (diff <= 0) {
        setCountdown("Started or Passed");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        setCountdown(`Starts in ${days} day${days > 1 ? "s" : ""}`);
      } else if (hours > 0) {
        setCountdown(`Starts in ${hours}h ${mins}m`);
      } else {
        setCountdown(`Starts in ${mins} mins!`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [availability.slot, isCompleted]);

  const handlePayNow = async () => {
    setIsPaying(true);
    try {
      await onPayNow?.(booking.id);
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setIsPaying(false);
    }
  };

  // Payment status badge renderer
  const renderPaymentBadge = () => {
    if (paymentStatus === "paid") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20">
          <CheckCircle className="w-3 h-3" />
          Paid
        </span>
      );
    }
    if (paymentStatus === "cash") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20">
          <Banknote className="w-3 h-3" />
          Cash
        </span>
      );
    }
    if (needsStripePayment) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <CreditCard className="w-3 h-3" />
          Unpaid
        </span>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border/50 p-6 rounded-2xl relative overflow-hidden shadow-xs space-y-4 hover:border-emerald-500/20 dark:hover:border-blue-500/20 transition-all group">
      {/* Top Banner: Status & Context Layout */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/40">
              <CheckCircle className="w-3 h-3 text-muted-foreground/60" />
              Passed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <AlertCircle className="w-3 h-3" />
              {countdown}
            </span>
          )}
          {renderPaymentBadge()}
        </div>

        <span
          className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded ${
            isCompleted
              ? "bg-emerald-500/10 text-emerald-600 dark:bg-blue-500/10 dark:text-blue-400"
              : "bg-amber-500/10 text-amber-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Title Area */}
      <div className="space-y-1">
        {availability.subject && (
          <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-600 dark:text-blue-400 bg-emerald-500/10 dark:bg-blue-500/10 px-2 py-0.5 rounded">
            {availability.subject}
          </span>
        )}
        <h3 className="text-base font-bold text-foreground pt-1">
          {availability.title || "Custom Architecture Sync Session"}
        </h3>
        <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
          {availability.details ||
            "Tailored project execution sync, logic path breakdown, and clean backend architectural planning workflow."}
        </p>
      </div>

      {/* Metadata Indicators Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1 text-xs border-y border-border/30 py-3">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowBio(!showBio)}
            className="flex items-center gap-1.5 text-muted-foreground font-medium hover:text-emerald-500 dark:hover:text-blue-500 transition-colors text-left cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span>
              Tutor:{" "}
              <strong className="text-foreground font-semibold">
                {availability.tutorProfile.user.name}
              </strong>
            </span>
            <Info className="w-3 h-3 opacity-60 shrink-0" />
          </button>

          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span>
              Duration:{" "}
              <strong className="text-foreground font-semibold">
                {durationMins} mins
              </strong>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
            <span className="truncate">
              {slotDate.toLocaleDateString(undefined, { dateStyle: "medium" })}{" "}
              at{" "}
              <strong className="text-foreground font-semibold">
                {slotDate.toLocaleTimeString(undefined, { timeStyle: "short" })}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-blue-500" />
            <span>
              Total Value:{" "}
              <strong className="text-emerald-600 dark:text-blue-500 font-bold">
                {totalCost === 0 ? "Free Session" : `$${totalCost.toFixed(2)}`}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Quick Bio Container */}
      {showBio && (
        <div className="bg-muted/40 border border-border/40 rounded-xl p-3 text-[11px] text-muted-foreground space-y-1.5 animate-in slide-in-from-top-1 duration-200">
          <p className="font-bold text-foreground">
            {availability.tutorProfile.title}
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {availability.tutorProfile.experienceYears} Years
          </p>
          <p className="leading-normal">
            <strong>Qualifications:</strong>{" "}
            {availability.tutorProfile.qualifications}
          </p>
        </div>
      )}

      {/* Footer Area: Handles Conditional Actions Rendering */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground max-w-[55%]">
          <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500 shrink-0" />
          <span className="truncate">
            {availability.location || "Remote (Zoom / Meet)"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pay Now button for unpaid Stripe bookings */}
          {!isCompleted && needsStripePayment && (
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isPaying}
              className="px-3 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isPaying ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CreditCard className="w-3 h-3" />
              )}
              {isPaying ? "Redirecting..." : "Pay Now"}
            </button>
          )}

          {isCompleted ? (
            booking.review ? (
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-500/5 dark:text-blue-400 dark:bg-blue-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10 dark:border-blue-500/10">
                Reviewed
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onOpenReviewModal?.(booking)}
                className="px-3 py-1.5 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Add Review
              </button>
            )
          ) : paymentStatus === "paid" ? (
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10 dark:border-blue-500/10">
              Paid — Non-Cancellable
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onCancel?.(booking.id)}
              className="px-3 py-1.5 text-[11px] font-bold text-rose-600 border border-rose-500/20 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Cancel Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
