"use client";

import { ShieldCheck, Lock, Eye, Zap } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* 1. HERO HEADER SECTION (EXACTLY MATCHES HOW-IT-WORKS HERO STYLE) */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> Secure Platform Integrity
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Privacy{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Learn how your user data, account specifications, and educational
            engagement histories are processed securely across the Skill Bridge
            ecosystem layout.
          </p>
        </section>
      </div>

      {/* 2. COMPREHENSIVE PRIVACY POLICY DETAILS LOGIC SECTION */}
      <section className="bg-muted/30 border border-border/40 rounded-2xl p-8 md:p-12 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Data Handling & Security Safeguards
          </h2>
          <p className="text-muted-foreground text-xs">
            Review our strict data isolation rules designed to preserve
            information privacy and security parameters cleanly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Item 1 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                1. Data Collection Bounds
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                We store metrics strictly mandatory for orchestrating class
                operations, including user account authentication fields,
                profile skill metadata tags, and chronological slot schedules
                mapped to our internal records.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                2. Transaction and Stripe Security
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Financial balances and checkouts utilize the high-end Stripe
                integration layer exclusively. Skill Bridge servers never
                intercept, record, or track private credit card configurations
                or direct database rows.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                3. Information Isolation Guardrails
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Your authenticated workspace data stays strictly protected.
                Multi-tenant access controls evaluate incoming JWT claims on the
                backend middleware layer to block arbitrary cross-account
                requests automatically.
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
                4. Cookie & Local State Storage
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Local cache states and tracking cookies are only accessed to
                retain user authentication sessions. These ensure quick page
                reloads across dashboard sub-tabs without demanding redundant
                authentication cycles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
