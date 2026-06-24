"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, DollarSign } from "lucide-react";

interface DashboardStats {
  totalHours: number;
  totalCompleteSessions: number;
  totalCost: number;
}

export default function StudentDashboardView() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/bookings/student-stats`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (error) {
        console.error("Failed loading stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            ✨ Synchronized Learning Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            My Performance{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Monitor your active learning metrics, track cumulative time
            investments, review your historical growth securely, and gain deep
            data insights into your overall engineering progress to maximize
            your backend mastery.
          </p>
        </section>
      </div>

      {/* Minimal Premium Unified Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Hours */}
        <div className="group relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-md dark:hover:bg-cyan-500/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Total Study Hours
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/5 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              {isLoading ? "— —" : stats?.totalHours || 0}
              <span className="text-xs font-bold text-muted-foreground ml-1.5 uppercase tracking-wider">
                hrs
              </span>
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Recorded learning session metrics.
            </p>
          </div>
        </div>

        {/* Passed Sessions */}
        <div className="group relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md dark:hover:bg-emerald-500/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Passed Sessions
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/5 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              {isLoading ? "— —" : stats?.totalCompleteSessions || 0}
              <span className="text-xs font-bold text-muted-foreground ml-1.5 uppercase tracking-wider">
                slots
              </span>
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Completed mentorship updates.
            </p>
          </div>
        </div>

        {/* Total Investment */}
        <div className="group relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-md dark:hover:bg-amber-500/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Total Investment
            </span>
            <div className="p-2 rounded-xl bg-amber-500/5 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:bg-amber-500/10 transition-all">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground transition-colors">
              {isLoading ? "— —" : `$${stats?.totalCost?.toFixed(2) || "0.00"}`}
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Allocated knowledge capital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
