"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  CreditCard,
  GraduationCap,
  UserCheck,
  Award,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"students" | "tutors">("students");

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* 1. HERO HEADER SECTION */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> Empowering Knowledge Commerce
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            How Skill Bridge{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Discover vetted engineering professionals for real-time code
            reviews, deep-dive architectural consultation, and personalized
            logic paths. Clear, premium, and structured step-by-step.
          </p>
        </section>
      </div>

      {/* 2. DUAL-TAB SYSTEM (TOGGLE SELECTOR) */}
      <section className="flex justify-center">
        <div className="bg-muted/60 border border-border/60 p-1.5 rounded-xl inline-flex items-center gap-1 w-full max-w-md shadow-xs">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "students"
                ? "bg-background text-emerald-600 dark:text-blue-400 shadow-sm border border-emerald-500/20 dark:border-blue-500/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap
              className={`w-4 h-4 ${activeTab === "students" ? "text-emerald-500 dark:text-blue-500" : ""}`}
            />
            For Students
          </button>
          <button
            onClick={() => setActiveTab("tutors")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "tutors"
                ? "bg-background text-teal-600 dark:text-blue-400 shadow-sm border border-teal-500/20 dark:border-blue-500/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Award
              className={`w-4 h-4 ${activeTab === "tutors" ? "text-teal-500 dark:text-blue-500" : ""}`}
            />
            For Tutors
          </button>
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS TIMELINE CONTENT */}
      <section className="pt-4 animate-in fade-in duration-300">
        {activeTab === "students" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Step 1 */}
            <div className="bg-card border border-border/50 p-8 rounded-2xl space-y-5 relative overflow-hidden group hover:border-emerald-500/40 dark:hover:border-blue-500/40 transition-all shadow-xs">
              <div className="absolute top-0 right-0 text-7xl font-black text-muted/10 translate-x-2 -translate-y-4 select-none">
                01
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-blue-500/10 flex items-center justify-center border border-emerald-500/20 dark:border-blue-500/20 text-emerald-500 dark:text-blue-500">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-500 dark:group-hover:text-blue-500 transition-colors">
                  1. Discover Your Mentor
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Filter through elite developers using parameters directly
                  synced to your browser URL. Match by price limits, ratings, or
                  tech stacks like React, Next.js, and Prisma seamlessly.
                </p>
              </div>
            </div>

            {/* Student Step 2 */}
            <div className="bg-card border border-border/50 p-8 rounded-2xl space-y-5 relative overflow-hidden group hover:border-emerald-500/40 dark:hover:border-blue-500/40 transition-all shadow-xs">
              <div className="absolute top-0 right-0 text-7xl font-black text-muted/10 translate-x-2 -translate-y-4 select-none">
                02
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-blue-500/10 flex items-center justify-center border border-emerald-500/20 dark:border-blue-500/20 text-emerald-500 dark:text-blue-500">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-500 dark:group-hover:text-blue-500 transition-colors">
                  2. Book Real-Time Slots
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Select available operational slots directly from the tutor's
                  booking grid. Our real-time calendar handles synchronization
                  to preserve timelines and prevent overlapping bookings.
                </p>
              </div>
            </div>

            {/* Student Step 3 */}
            <div className="bg-card border border-border/50 p-8 rounded-2xl space-y-5 relative overflow-hidden group hover:border-emerald-500/40 dark:hover:border-blue-500/40 transition-all shadow-xs">
              <div className="absolute top-0 right-0 text-7xl font-black text-muted/10 translate-x-2 -translate-y-4 select-none">
                03
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-blue-500/10 flex items-center justify-center border border-emerald-500/20 dark:border-blue-500/20 text-emerald-500 dark:text-blue-500">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-500 dark:group-hover:text-blue-500 transition-colors">
                  3. Secure Payment Hold
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Authorize your booking utilizing Stripe. Funds are secured on
                  a strict 3-day holding pattern, ensuring comprehensive quality
                  assurance prior to final system balance release rules.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tutor Step 1 */}
            <div className="bg-card border border-border/50 p-8 rounded-2xl space-y-5 relative overflow-hidden group hover:border-teal-500/40 dark:hover:border-blue-500/40 transition-all shadow-xs">
              <div className="absolute top-0 right-0 text-7xl font-black text-muted/10 translate-x-2 -translate-y-4 select-none">
                01
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 dark:bg-blue-500/10 flex items-center justify-center border border-teal-500/20 dark:border-blue-500/20 text-teal-500 dark:text-blue-500">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-teal-500 dark:group-hover:text-blue-500 transition-colors">
                  1. Setup Profile
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Construct your verified profile. Define target categories,
                  input specialized teaching experience fields, and select
                  custom array skill tags matched perfectly to database indexes.
                </p>
              </div>
            </div>

            {/* Tutor Step 2 */}
            <div className="bg-card border border-border/50 p-8 rounded-2xl space-y-5 relative overflow-hidden group hover:border-teal-500/40 dark:hover:border-blue-500/40 transition-all shadow-xs">
              <div className="absolute top-0 right-0 text-7xl font-black text-muted/10 translate-x-2 -translate-y-4 select-none">
                02
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 dark:bg-blue-500/10 flex items-center justify-center border border-teal-500/20 dark:border-blue-500/20 text-teal-500 dark:text-blue-500">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-teal-500 dark:group-hover:text-blue-500 transition-colors">
                  2. Live Scheduling Control
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Control availability matrices inside your private workspace.
                  Accept session alerts automatically and interact via premium,
                  lower-latency data layers built for modern engineering tasks.
                </p>
              </div>
            </div>

            {/* Tutor Step 3 */}
            <div className="bg-card border border-border/50 p-8 rounded-2xl space-y-5 relative overflow-hidden group hover:border-teal-500/40 dark:hover:border-blue-500/40 transition-all shadow-xs">
              <div className="absolute top-0 right-0 text-7xl font-black text-muted/10 translate-x-2 -translate-y-4 select-none">
                03
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 dark:bg-blue-500/10 flex items-center justify-center border border-teal-500/20 dark:border-blue-500/20 text-teal-500 dark:text-blue-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-teal-500 dark:group-hover:text-blue-500 transition-colors">
                  3. Automated Financial Payout
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Once your meeting validation lifecycle clears checkpoints,
                  funds transition from the holding tier directly into your
                  linked bank account automatically without friction.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. PREMIUM SYSTEM HIGHLIGHT DETAILS SECTION */}
      <section className="bg-muted/30 border border-border/40 rounded-2xl p-8 md:p-12 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Marketplace Architecture Safeguards
          </h2>
          <p className="text-muted-foreground text-xs">
            Engineed from the ground up for strict security, state data
            reliability, and performance consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                Stripe-Escrow 3-Day Validation Holds
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                To guarantee optimal system integrity, all transactional
                balances rest on automated secure validation timelines.
                Protection is absolute for both developers and active learning
                entities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                Case-Insensitive Database Query Matching
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Skill profiles and search strings match securely on the backend
                logic layout via strict Prisma database filter models,
                maintaining pristine accuracy bounds across heavy operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PREMIUM INTERACTIVE FAQ ACCORDION GRID */}
      <section className="space-y-8 pt-4 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Everything you need to know about the Skill Bridge pipeline, booking
            systems, and guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* FAQ Item 1 */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 transition-all hover:border-emerald-500/20 dark:hover:border-blue-500/20 group">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 group-hover:text-emerald-500 dark:group-hover:text-blue-500 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-blue-500" />
              How does the 3-day payment hold protect me?
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed pl-3.5 mt-2">
              When you book a session, your payment is held securely by Stripe
              for 3 days after the scheduled completion time. This gives you
              ample opportunity to verify the slot quality and ensure all
              engineering goals were met before funds are permanently released
              to the tutor.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 transition-all hover:border-teal-500/20 dark:hover:border-blue-500/20 group">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 group-hover:text-teal-500 dark:group-hover:text-blue-500 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-blue-500" />
              What happens if a mentor needs to reschedule?
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed pl-3.5 mt-2">
              If an overlapping event or timeline emergency requires a
              reschedule, mentors can propose a new block through their calendar
              manager interface. If the updated slot doesn't match your
              availability, you can instantly cancel the transaction to trigger
              an immediate automated refund pool release.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 transition-all hover:border-emerald-500/20 dark:hover:border-blue-500/20 group">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 group-hover:text-emerald-500 dark:group-hover:text-blue-500 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-blue-500" />
              Are the profiles and expert categories verified?
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed pl-3.5 mt-2">
              Absolutely. Every tutor undergoes background skill assessments and
              profile validation before their metadata status is modified to
              active on our database tables. This preserves our premium
              instructional layer and keeps search indexes clear of unvetted
              profiles.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
