"use client";

import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Cancel icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 border-2 border-amber-500/30 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-amber-500" />
        </div>

        {/* Main content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Your payment was not completed. Don&apos;t worry — your booking is
            still saved. You can complete the payment anytime from your bookings
            dashboard.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/bookings"
            className="w-full h-11 flex items-center justify-center gap-2 text-xs font-bold rounded-xl bg-emerald-500 dark:bg-blue-600 text-white hover:opacity-95 transition-opacity"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Go to My Bookings
          </Link>
          <Link
            href="/"
            className="w-full h-10 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl border border-border/60 text-muted-foreground hover:bg-muted/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SafeCancelPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground">Loading...</div>
        }
      >
        <PaymentCancelPage />
      </Suspense>
    </main>
  );
}
