"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface PriceOverrideDialogProps {
  isOpen: boolean;
  onConfirm: () => void; // User clicks OK (Reset to base rate)
  onCancel: () => void; // User clicks Cancel (Allow override)
}

export function PriceOverrideDialog({
  isOpen,
  onConfirm,
  onCancel,
}: PriceOverrideDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md rounded-2xl">
        <AlertDialogHeader className="space-y-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <AlertDialogTitle className="text-base font-black tracking-tight text-foreground">
              Avoid Changing Individual Session Rates
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Modifying individual slot rates can confuse students. If you need
              to permanently change your pricing structures, please update your
              base hourly rate directly from your profile settings.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-2 sm:gap-1.5">
          {/* Cancel maps to overriding/continuing custom edit */}
          <AlertDialogCancel
            onClick={onCancel}
            className="text-xs font-semibold rounded-xl border-border/80"
          >
            Override Custom Price
          </AlertDialogCancel>

          {/* Action maps to keeping profile base rate */}
          <AlertDialogAction
            onClick={onConfirm}
            className="text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 border-none"
          >
            Keep Base Rate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
