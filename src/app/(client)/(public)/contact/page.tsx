"use client";

import React, { useState } from "react";
import { Mail, Clock, ShieldAlert, Zap, Copy, Check } from "lucide-react";

export default function SupportContactPage() {
  const [copiedText, setCopiedText] = useState(false);
  const supportEmail = "support@skillbridge.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* 1. HERO HEADER SECTION */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> 24/7 Operations Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Support{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Have questions regarding tutor availability setups, active session
            cancellations, or Stripe payment holds? Connect with our technical
            assistance desks instantly.
          </p>
        </section>
      </div>

      {/* 2. CONTACT DETAILS GRID LOGIC SECTION */}
      <section className="bg-muted/30 border border-border/40 rounded-2xl p-8 md:p-12 space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Help Desk Routing Directives
          </h2>
          <p className="text-muted-foreground text-xs">
            Reach out through our verified channels for lower-latency problem
            resolution loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {/* Card 1 - Email Inquiries */}
          <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 relative group hover:border-emerald-500/30 dark:hover:border-blue-500/30 transition-all duration-300">
            <div className="p-3 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1 w-full">
              <h4 className="text-sm font-bold text-foreground">
                Email Dispatch
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed pb-2">
                Open technical support tickets directly via email communication.
              </p>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 bg-muted/60 hover:bg-muted text-foreground text-xs font-bold py-2 px-3.5 rounded-lg transition-colors border border-border/40 w-full justify-center cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500" />
                    Copied Address
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    {supportEmail}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2 - Operational Timelines */}
          <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 relative group hover:border-emerald-500/30 dark:hover:border-blue-500/30 transition-all duration-300">
            <div className="p-3 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                Turnaround Windows
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Our internal pipeline monitors active tickets continuously.
                Engineering account reviews usually resolve in less than{" "}
                <span className="font-bold text-foreground">
                  12 to 24 hours
                </span>{" "}
                max.
              </p>
            </div>
          </div>

          {/* Card 3 - Escrow Assistance */}
          <div className="bg-card border border-border/50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 relative group hover:border-emerald-500/30 dark:hover:border-blue-500/30 transition-all duration-300">
            <div className="p-3 bg-background border border-border/60 rounded-xl text-emerald-500 dark:text-blue-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                Escrow Verification
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                If an issue appears regarding class execution during the{" "}
                <span className="font-bold text-foreground">
                  3-day holding pattern
                </span>
                , flag the transaction route manually to suspend payout releases
                instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
