"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, MonitorPlay } from "lucide-react";

interface SlotItem {
  id: string;
  status: string;
  timeDuration: string | null;
}

interface TutorStats {
  totalHoursTaught: number;
  totalClasses: number;
  avgClassDurationMinutes: number;
}

export default function TutorDashboardView() {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTutorStats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${baseUrl}/availability/my-slots`, {
          credentials: "include",
        });
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          // Filter slots where status is exactly "completed"
          const completedSlots = json.data.filter(
            (slot: SlotItem) => slot.status === "completed",
          );

          const totalClasses = completedSlots.length;

          // Sum durations (convert string values to numbers safely)
          const totalMinutes = completedSlots.reduce(
            (acc: number, curr: SlotItem) => {
              const minutes = curr.timeDuration
                ? parseInt(curr.timeDuration, 10)
                : 60;
              return acc + (isNaN(minutes) ? 0 : minutes);
            },
            0,
          );

          // Convert minutes into total hours format
          const totalHoursTaught = parseFloat((totalMinutes / 60).toFixed(1));

          // Calculate average duration in minutes (Total Minutes / Total Classes)
          const avgClassDurationMinutes =
            totalClasses > 0 ? Math.round(totalMinutes / totalClasses) : 0;

          setStats({
            totalHoursTaught,
            totalClasses,
            avgClassDurationMinutes,
          });
        }
      } catch (error) {
        console.error("Failed loading tutor stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorStats();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* Replicated Matching Header Section */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            ✨ Synchronized Knowledge Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Tutor Performance{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Monitor your active teaching metrics, track cumulative time
            investments, review your historical growth securely, and gain deep
            data insights into your overall engineering progress to maximize
            your backend mastery.
          </p>
        </section>
      </div>

      {/* Minimal Premium Unified Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Total Hours Taught */}
        <div className="group relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-md dark:hover:bg-cyan-500/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Total Hours Taught
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/5 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              {isLoading ? "— —" : stats?.totalHoursTaught || 0}
              <span className="text-xs font-bold text-muted-foreground ml-1.5 uppercase tracking-wider">
                hrs
              </span>
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Recorded teaching session metrics.
            </p>
          </div>
        </div>

        {/* Metric 2: Total Classes */}
        <div className="group relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-blue-500/30 hover:shadow-md dark:hover:bg-blue-500/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-blue-400 transition-colors">
              Total Classes
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/5 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-blue-400 group-hover:bg-emerald-500/10 dark:group-hover:bg-blue-500/10 transition-all">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              {isLoading ? "— —" : stats?.totalClasses || 0}
              <span className="text-xs font-bold text-muted-foreground ml-1.5 uppercase tracking-wider">
                slots
              </span>
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Completed mentorship updates.
            </p>
          </div>
        </div>

        {/* Metric 3: Average Class Duration */}
        <div className="group relative rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-md dark:hover:bg-amber-500/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Avg Class Duration
            </span>
            <div className="p-2 rounded-xl bg-amber-500/5 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:bg-amber-500/10 transition-all">
              <MonitorPlay className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {isLoading ? "— —" : `${stats?.avgClassDurationMinutes || 0}`}
              <span className="text-xs font-bold text-muted-foreground ml-1.5 uppercase tracking-wider">
                min
              </span>
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground/80">
              Average session timeframe breakdown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
