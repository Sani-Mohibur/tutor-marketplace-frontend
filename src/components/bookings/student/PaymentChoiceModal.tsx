"use client";

import { CreditCard, Banknote, X } from "lucide-react";

interface PaymentChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayNow: () => void;
  onPayLater: () => void;
}

export function PaymentChoiceModal({
  isOpen,
  onClose,
  onPayNow,
  onPayLater,
}: PaymentChoiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border/60 rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5 animate-in zoom-in-95 fade-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5">
          <h3 className="text-lg font-black tracking-tight text-foreground">
            How would you like to pay?
          </h3>
          <p className="text-xs text-muted-foreground font-medium">
            This session accepts both online and cash payments.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Pay Now with Stripe */}
          <button
            onClick={onPayNow}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 hover:border-violet-500/50 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">
                Pay Now with Stripe
              </p>
              <p className="text-[11px] text-muted-foreground">
                Secure online payment — instant confirmation
              </p>
            </div>
          </button>

          {/* Pay Later with Cash */}
          <button
            onClick={onPayLater}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-border transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shadow-sm">
              <Banknote className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">
                Pay Later (Cash)
              </p>
              <p className="text-[11px] text-muted-foreground">
                Pay the tutor directly at the session
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
