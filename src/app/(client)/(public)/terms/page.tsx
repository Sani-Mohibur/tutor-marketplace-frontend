"use client";

import React from "react";
import { ShieldCheck, FileText, Scale, Zap } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* 1. HERO HEADER SECTION */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> Legal Framework & Guidelines
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Terms of{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Please read these terms and conditions carefully before utilizing
            the Skill Bridge matching portal, transaction systems, or scheduler
            workspaces.
          </p>
        </section>
      </div>

      {/* 2. TERMS OF SERVICE DETAILS LOGIC SECTION */}
      <section className="bg-muted/30 border border-border/40 rounded-2xl p-8 md:p-12 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            User Agreement & Operational Rules
          </h2>
          <p className="text-muted-foreground text-xs">
            Our strict guidelines protect marketplace interaction integrity
            across both students and verified mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Item 1 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                1. Account Registration & Role Access
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Users must register accurately as either a Student or a Tutor.
                Sharing accounts or bypassing identity configuration metrics
                violates system safety guarantees.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                2. Scheduling & 3-Day Escrow Hold
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                All class bookings adhere to standard Stripe transaction
                patterns. Captured funds reside under an automated 3-day
                verification freeze before final payout distribution occurs.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                3. Cancellation & Refund Rules
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Students can safely cancel structured slots before completion
                timelines. Once a slot is formally finalized as completed by
                verification bounds, refund allocations close.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                4. Code & Intellectual Property
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Code snippets, logic consulting recommendations, and
                architectural reviews shared during ongoing live support items
                belong strictly to the respective engineering students.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
