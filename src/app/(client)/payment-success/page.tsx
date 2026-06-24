"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  CreditCard,
  Loader2,
  Download,
} from "lucide-react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ReceiptData {
  bookingId: string;
  status: string;
  paymentStatus: string;
  amount: number | null;
  currency: string | null;
  stripeSessionId: string | null;
  sessionTitle: string | null;
  sessionSubject: string | null;
  sessionDate: string | null;
  sessionDuration: string | null;
  sessionLocation: string | null;
  tutorName: string | null;
  paidAt: string | null;
}

function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [showConfetti, setShowConfetti] = useState(true);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false);
      return;
    }

    const fetchReceipt = async () => {
      try {
        const res = await fetch(`${API_BASE}/payments/receipt/${sessionId}`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success && json.data) {
          setReceipt(json.data);
        }
      } catch (err) {
        console.error("Error fetching receipt:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to allow webhook to process
    const delay = setTimeout(fetchReceipt, 1500);
    return () => clearTimeout(delay);
  }, [sessionId]);

  const formatCurrency = (amount: number | null, currency: string | null) => {
    if (!amount) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "usd",
    }).format(amount);
  };

  const generateReceiptPDF = () => {
    if (!receipt) return;

    const dateStr = receipt.sessionDate
      ? new Date(receipt.sessionDate).toLocaleDateString(undefined, {
          dateStyle: "long",
        })
      : "N/A";
    const amountStr = formatCurrency(receipt.amount, receipt.currency);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt - SkillBridge</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; padding: 40px; color: #1a1a1a; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #e5e7eb; }
          .header h1 { font-size: 22px; font-weight: 800; color: #059669; margin-bottom: 4px; }
          .header p { font-size: 12px; color: #6b7280; }
          .badge { display: inline-block; background: #d1fae5; color: #059669; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
          .section { margin-bottom: 20px; }
          .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 10px; }
          .row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; font-size: 13px; }
          .row .label { color: #6b7280; }
          .row .value { font-weight: 600; color: #1a1a1a; }
          .divider { border: none; border-top: 1px solid #e5e7eb; margin: 16px 0; }
          .amount-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; }
          .amount-row .label { font-size: 14px; font-weight: 600; color: #374151; }
          .amount-row .value { font-size: 24px; font-weight: 800; color: #059669; }
          .txn-id { background: #f3f4f6; padding: 12px; border-radius: 8px; margin-top: 16px; }
          .txn-id .label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; display: block; margin-bottom: 4px; }
          .txn-id .value { font-size: 10px; color: #6b7280; word-break: break-all; font-family: monospace; }
          .footer { text-align: center; margin-top: 32px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 11px; color: #9ca3af; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✅ Payment Receipt</h1>
          <p>SkillBridge — Tutoring Platform</p>
          <div style="margin-top: 10px;"><span class="badge">${receipt.paymentStatus?.toUpperCase()}</span></div>
        </div>

        <div class="section">
          <div class="section-title">Session Details</div>
          ${receipt.sessionTitle ? `<div class="row"><span class="label">Session</span><span class="value">${receipt.sessionTitle}</span></div>` : ""}
          ${receipt.sessionSubject ? `<div class="row"><span class="label">Subject</span><span class="value">${receipt.sessionSubject}</span></div>` : ""}
          ${receipt.tutorName ? `<div class="row"><span class="label">Tutor</span><span class="value">${receipt.tutorName}</span></div>` : ""}
          <div class="row"><span class="label">Date</span><span class="value">${dateStr}</span></div>
          ${receipt.sessionDuration ? `<div class="row"><span class="label">Duration</span><span class="value">${receipt.sessionDuration} minutes</span></div>` : ""}
          ${receipt.sessionLocation ? `<div class="row"><span class="label">Location</span><span class="value">${receipt.sessionLocation}</span></div>` : ""}
        </div>

        <hr class="divider" />

        <div class="amount-row">
          <span class="label">Amount Paid</span>
          <span class="value">${amountStr}</span>
        </div>

        ${receipt.stripeSessionId ? `<div class="txn-id"><span class="label">Transaction ID</span><span class="value">${receipt.stripeSessionId}</span></div>` : ""}

        <div class="footer">
          <p>Thank you for using SkillBridge!</p>
          <p style="margin-top: 4px;">Booking ID: ${receipt.bookingId}</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <main className="py-12 bg-background flex items-center justify-center px-4 w-full">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated success icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-blue-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          {showConfetti && (
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Payment Successful!
          </h1>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Your session has been booked and payment confirmed.
          </p>
        </div>

        {/* Receipt Card */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : receipt ? (
          <div className="bg-card border border-border/50 rounded-2xl p-5 text-left space-y-4 shadow-sm">
            {/* Receipt header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Payment Receipt
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" />
                {receipt.paymentStatus?.toUpperCase()}
              </span>
            </div>

            {/* Session info */}
            <div className="space-y-3">
              {receipt.sessionTitle && (
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {receipt.sessionTitle}
                  </h3>
                  {receipt.sessionSubject && (
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-600 dark:text-blue-400 bg-emerald-500/10 dark:bg-blue-500/10 px-2 py-0.5 rounded mt-1 inline-block">
                      {receipt.sessionSubject}
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {receipt.tutorName && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <User className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-medium truncate">
                      {receipt.tutorName}
                    </span>
                  </div>
                )}

                {receipt.sessionDate && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-medium">
                      {new Date(receipt.sessionDate).toLocaleDateString(
                        undefined,
                        { dateStyle: "medium" },
                      )}
                    </span>
                  </div>
                )}

                {receipt.sessionDuration && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-medium">
                      {receipt.sessionDuration} mins
                    </span>
                  </div>
                )}

                {receipt.sessionLocation && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="font-medium truncate">
                      {receipt.sessionLocation}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CreditCard className="w-3.5 h-3.5" />
                <span className="font-medium">Amount Paid</span>
              </div>
              <span className="text-lg font-black text-emerald-600 dark:text-blue-400">
                {formatCurrency(receipt.amount, receipt.currency)}
              </span>
            </div>

            {/* Transaction ref */}
            {receipt.stripeSessionId && (
              <div className="bg-muted/40 border border-border/30 rounded-lg px-3 py-2 text-[10px] text-muted-foreground font-mono break-all">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 block mb-0.5">
                  Transaction ID
                </span>
                {receipt.stripeSessionId}
              </div>
            )}
          </div>
        ) : (
          /* Fallback if no receipt found */
          sessionId && (
            <div className="bg-muted/40 border border-border/40 rounded-xl px-4 py-3 text-[11px] text-muted-foreground font-mono break-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 block mb-1">
                Transaction Reference
              </span>
              {sessionId}
            </div>
          )
        )}

        {/* Download + Action buttons */}
        <div className="flex flex-col gap-3 pt-2">
          {receipt && (
            <button
              onClick={generateReceiptPDF}
              className="w-full h-11 flex items-center justify-center gap-2 text-xs font-bold rounded-xl border-2 border-emerald-500/30 dark:border-blue-500/30 text-emerald-600 dark:text-blue-400 hover:bg-emerald-500/5 dark:hover:bg-blue-500/5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Receipt as PDF
            </button>
          )}
          <Link
            href="/bookings"
            className="w-full h-11 flex items-center justify-center gap-2 text-xs font-bold rounded-xl bg-emerald-500 dark:bg-blue-600 text-white hover:opacity-95 transition-opacity"
          >
            View My Bookings
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

export default function SafePaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      }
    >
      <PaymentSuccessPage />
    </Suspense>
  );
}
