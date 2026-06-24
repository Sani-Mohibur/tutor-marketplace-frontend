"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SlotCreationForm } from "@/components/slots/SlotCreationForm";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function CreateSlotPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background pt-16 pb-16 px-4 max-w-3xl mx-auto w-full space-y-6">
      <button
        onClick={() => router.push("/slots")}
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Slots Board
      </button>

      <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-black text-foreground tracking-tight">
            Create New Appointment Slot
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure your topic parameters and publish a custom live
            availability window.
          </p>
        </div>

        {/* Modular extracted creation form core layout */}
        <SlotCreationForm apiBase={API_BASE} />
      </div>
    </main>
  );
}
