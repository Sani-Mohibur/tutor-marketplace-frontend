"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  DollarSign,
  CheckSquare,
  Square,
  Tag,
  BookOpen,
  Calculator,
  MapPin,
  FileText,
  CreditCard,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { DateTimePicker } from "./DateTimePicker";
import { PriceOverrideDialog } from "./PriceOverrideDialog";

interface SlotCreationFormProps {
  apiBase: string;
}

export function SlotCreationForm({ apiBase }: SlotCreationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [isFree, setIsFree] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [hasWarned, setHasWarned] = useState(false);
  const [pendingPrice, setPendingPrice] = useState("");

  const [formData, setFormData] = useState({
    slot: "",
    title: "",
    subject: "",
    timeDuration: "60",
    pricePerHour: "0",
    details: "",
    location: "",
    paymentMethod: "cash", // "cash" | "stripe" | "both"
  });

  useEffect(() => {
    const fetchProfileRate = async () => {
      try {
        const res = await fetch(`${apiBase}/profile/me`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success && json.data) {
          const rate = json.data.pricePerHour || 0;
          setBasePrice(rate);
          setFormData((prev) => ({ ...prev, pricePerHour: rate.toString() }));
          // Check verification status
          setIsVerified(json.data.isVerified || false);
        }
      } catch (err) {
        console.error("Error fetching baseline profile rate:", err);
      }
    };
    fetchProfileRate();
  }, [apiBase]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!hasWarned && newValue !== basePrice.toString()) {
      setPendingPrice(newValue);
      setIsAlertOpen(true);
      return;
    }
    setFormData((prev) => ({ ...prev, pricePerHour: newValue }));
  };

  const handleAlertConfirm = () => {
    setIsAlertOpen(false);
    setFormData((prev) => ({ ...prev, pricePerHour: basePrice.toString() }));
  };

  const handleAlertCancel = () => {
    setIsAlertOpen(false);
    setHasWarned(true);
    setFormData((prev) => ({ ...prev, pricePerHour: pendingPrice }));
  };

  const toggleFreeSession = () => {
    if (!isFree) {
      setIsFree(true);
      setFormData((prev) => ({ ...prev, pricePerHour: "0", paymentMethod: "cash" }));
    } else {
      setIsFree(false);
      setFormData((prev) => ({ ...prev, pricePerHour: basePrice.toString() }));
    }
  };

  const numericPrice = parseFloat(formData.pricePerHour) || 0;
  const numericDuration = parseFloat(formData.timeDuration) || 0;
  const totalCostEstimate = numericPrice * (numericDuration / 60);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slot) {
      toast.error("Please pick a valid schedule date and time.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiBase}/availability/create-slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pricePerHour: parseFloat(formData.pricePerHour),
        }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Your slot is created successfully!");
        router.push("/slots");
      } else {
        toast.error(json.message || "Failed to create slot.");
      }
    } catch (err) {
      console.error("Create slot issue:", err);
      toast.error("Runtime connectivity issue occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethodOptions = [
    { value: "cash", label: "Cash", icon: Banknote, alwaysAvailable: true },
    { value: "stripe", label: "Stripe", icon: CreditCard, alwaysAvailable: false },
    { value: "both", label: "Both", icon: DollarSign, alwaysAvailable: false },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <DateTimePicker
          value={formData.slot}
          onChange={(iso) => setFormData((prev) => ({ ...prev, slot: iso }))}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Topic Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., System Design Deep Dive"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-10 bg-background border border-border/80 rounded-xl px-3 text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Subject Core
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Backend Engineering"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full h-10 bg-background border border-border/80 rounded-xl px-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Duration (Minutes)
            </label>
            <input
              type="number"
              required
              min="15"
              value={formData.timeDuration}
              onChange={(e) =>
                setFormData({ ...formData, timeDuration: e.target.value })
              }
              className="w-full h-10 bg-background border border-border/80 rounded-xl px-3 text-sm focus:outline-none"
            />
          </div>

          {/* Changed from select dropdown to open full text field input layout */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Session Location / Address
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Google Meet URL or full physical address"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full h-10 bg-background border border-border/80 rounded-xl px-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Agenda & Details
          </label>
          <textarea
            required
            rows={7}
            placeholder="Describe what will be covered, prerequisites, or session goals..."
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            className="w-full bg-background border border-border/80 rounded-xl p-3 text-sm focus:outline-none resize-none"
          />
        </div>

        {/* Pricing Segment */}
        <div className="border border-border/80 bg-muted/30 p-4 rounded-2xl space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Hourly Session Rate ($)
              </label>

              <button
                type="button"
                onClick={toggleFreeSession}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-blue-400 cursor-pointer"
              >
                {isFree ? (
                  <CheckSquare className="w-4 h-4 fill-emerald-500/5 cursor-pointer" />
                ) : (
                  <Square className="w-4 h-4 cursor-pointer" />
                )}
                Offer Free Session
              </button>
            </div>

            <input
              type="number"
              min="0"
              step="any" // to allow floating numbers
              disabled={isFree}
              value={formData.pricePerHour}
              onChange={handlePriceChange}
              className="w-full h-10 bg-background disabled:bg-muted/60 disabled:opacity-70 border border-border/80 rounded-xl px-3 text-sm focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-border/60 text-muted-foreground">
            <span className="flex items-center gap-1 font-medium">
              <Calculator className="w-3.5 h-3.5 text-muted-foreground" /> Total
              Calculated Price:
            </span>
            <span className="font-extrabold text-sm text-foreground font-mono bg-background/60 px-2.5 py-1 rounded-lg border border-border/40">
              {totalCostEstimate === 0
                ? "FREE"
                : `$${totalCostEstimate.toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* Payment Method Segment */}
        <div className="border border-border/80 bg-muted/30 p-4 rounded-2xl space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" /> Payment Method
          </label>

          {!isVerified && (
            <div className="flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium">
                Stripe payments require account verification. Contact admin to get verified.
              </span>
            </div>
          )}

          <div className="flex gap-2">
            {paymentMethodOptions.map((option) => {
              const Icon = option.icon;
              const isDisabled = !option.alwaysAvailable && !isVerified;
              const isSelected = formData.paymentMethod === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={isDisabled || isFree}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: option.value,
                    }))
                  }
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer
                    ${
                      isSelected
                        ? "bg-emerald-500/10 dark:bg-blue-500/10 border-emerald-500/40 dark:border-blue-500/40 text-emerald-600 dark:text-blue-400"
                        : "bg-background border-border/60 text-muted-foreground hover:border-border"
                    }
                    ${isDisabled || isFree ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 text-xs font-bold rounded-xl bg-emerald-500 dark:bg-blue-600 text-white hover:opacity-95 transition-opacity disabled:opacity-40 cursor-pointer"
        >
          {isSubmitting ? "Publishing Session..." : "Publish Availability Slot"}
        </button>
      </form>

      <PriceOverrideDialog
        isOpen={isAlertOpen}
        onConfirm={handleAlertConfirm}
        onCancel={handleAlertCancel}
      />
    </>
  );
}
