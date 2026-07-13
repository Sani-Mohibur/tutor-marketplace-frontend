"use client";

import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit2,
  Clock,
  Calendar,
  DollarSign,
  Check,
  FileText,
  MapPin,
  CreditCard,
  Banknote,
} from "lucide-react";
import { SlotData } from "./types";
import { toast } from "sonner";
import { DateTimePicker } from "./DateTimePicker";

interface SlotListCardProps {
  slotData: SlotData;
  onRefresh: () => void;
  apiBase: string;
}

export function SlotListCard({
  slotData,
  onRefresh,
  apiBase,
}: SlotListCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDate, setUpdatedDate] = useState(slotData.slot);
  const [updatedDetails, setUpdatedDetails] = useState(slotData.details || "");
  const [updatedLocation, setUpdatedLocation] = useState(
    slotData.location || "",
  );
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    setUpdatedDate(slotData.slot);
    setUpdatedDetails(slotData.details || "");
    setUpdatedLocation(slotData.location || "");
  }, [slotData]);

  const isFuture = new Date(slotData.slot) > new Date();
  const canDelete = isFuture;
  const canUpdate = isFuture;

  // REMOVED ISBOOKED: Badge status now runs entirely based on time evaluation
  const getStatusBadge = () => {
    if (!isFuture) {
      return {
        text: "Completed",
        className:
          "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
      };
    }
    return {
      text: "Open",
      className:
        "bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 border border-emerald-500/20 dark:border-blue-500/20",
    };
  };

  const statusBadge = getStatusBadge();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this availability slot?"))
      return;
    try {
      setIsActionLoading(true);
      const res = await fetch(`${apiBase}/availability/${slotData.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Slot deleted successfully.");
        onRefresh();
      } else {
        toast.error(json.message || "Failed to delete slot.");
      }
    } catch (err) {
      console.error("Delete slot error:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsActionLoading(true);
      const res = await fetch(`${apiBase}/availability/${slotData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: new Date(updatedDate).toISOString(),
          details: updatedDetails,
          location: updatedLocation,
        }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Slot updated successfully!");
        setIsEditing(false);
        onRefresh();
      } else {
        toast.error(json.message || "Failed to update slot.");
      }
    } catch (err) {
      console.error("Update slot error:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${statusBadge.className}`}
        >
          {statusBadge.text}
        </span>

        <div className="flex items-center gap-1.5">
          {canUpdate && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit Details / Reschedule"
            >
              <Edit2 className="w-4 h-4 cursor-pointer" />
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isActionLoading}
              className="p-1.5 text-destructive/70 hover:text-destructive rounded-md hover:bg-destructive/5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 cursor-pointer" />
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-sm text-foreground line-clamp-1">
          {slotData.title || "Untitled Session"}
        </h4>
        <p className="text-xs text-primary font-medium mt-0.5">
          {slotData.subject || "General Engineering"}
        </p>

        {slotData.location && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500 shrink-0" />
            <span className="truncate">{slotData.location}</span>
          </div>
        )}

        {slotData.details && !isEditing && (
          <p className="text-xs text-muted-foreground mt-2 bg-slate-200/40 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-300/40 dark:border-slate-800/50 line-clamp-3 max-h-[4.5rem] overflow-hidden text-ellipsis leading-relaxed">
            {slotData.details}
          </p>
        )}
      </div>

      <hr className="border-slate-300 dark:border-slate-800" />

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{new Date(slotData.slot).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{slotData.timeDuration || "60"} Mins</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 text-foreground font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500 shrink-0" />
            <span>
              {slotData.pricePerHour ? `$${slotData.pricePerHour}/hr` : "$0/hr"}{" "}
              (Total: $
              {(
                (slotData.pricePerHour || 0) *
                (parseFloat(slotData.timeDuration || "60") / 60)
              ).toFixed(2)}
              )
            </span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            {slotData.paymentMethod === "stripe" || slotData.paymentMethod === "both" ? (
              <CreditCard className="w-3.5 h-3.5 text-violet-500 shrink-0" />
            ) : (
              <Banknote className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            )}
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full border ${slotData.paymentMethod === "stripe"
                ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
                : slotData.paymentMethod === "both"
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                  : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
              }`}>
              {slotData.paymentMethod === "both" ? "Cash / Stripe" : slotData.paymentMethod === "stripe" ? "Stripe Only" : "Cash Only"}
            </span>
          </div>
        </div>
      ) : (
        /* Edit Form Context */
        <form
          onSubmit={handleUpdate}
          className="space-y-3 bg-slate-200/50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-300 dark:border-slate-800"
        >
          <DateTimePicker
            value={updatedDate}
            onChange={(iso) => setUpdatedDate(iso)}
          />

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Location / Address
            </label>
            <input
              type="text"
              required
              placeholder="Update virtual link or physical address..."
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              className="w-full bg-background border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
              <FileText className="w-3 h-3" /> Details & Agenda
            </label>
            <textarea
              rows={6}
              value={updatedDetails}
              onChange={(e) => setUpdatedDetails(e.target.value)}
              placeholder="Update goals or agenda parameters..."
              className="w-full bg-background border border-slate-300 dark:border-slate-700 rounded-md p-2 text-xs focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 opacity-60 cursor-not-allowed select-none">
            <div className="space-y-0.5">
              <label className="text-[9px] font-semibold text-muted-foreground uppercase">
                Duration
              </label>
              <input
                type="text"
                disabled
                value={`${slotData.timeDuration} min`}
                className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-0.5 text-xs text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div className="space-y-0.5">
              <label className="text-[9px] font-semibold text-muted-foreground uppercase">
                Rate / Hour
              </label>
              <input
                type="text"
                disabled
                value={`$${slotData.pricePerHour}`}
                className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-0.5 text-xs text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 rounded bg-background border border-slate-300 dark:border-slate-700 text-muted-foreground text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isActionLoading}
              className="px-2 py-1 rounded bg-emerald-500 dark:bg-blue-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-3 h-3" /> Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
