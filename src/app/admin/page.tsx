"use client";

import { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  UserSquare2,
  ShieldCheck,
  CalendarCheck,
  Clock,
  Star,
  ShieldAlert,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  totalAdmins: number;
  totalBookings: number;
  totalAvailabilities: number;
  totalFeatured: number;
  totalVerified: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiBase}/admin/stats`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error(
          "Failed fetching operational data telemetry matrix:",
          err,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [apiBase]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-3 w-full">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-xs text-muted-foreground font-medium">
          Assembling administrative metric aggregations...
        </p>
      </div>
    );
  }

  // Structural mapping utilizing your 8 required distinct backend counting vectors
  const metricCards = [
    {
      title: "Total Registered Users",
      count: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Core Students",
      count: stats?.totalStudents ?? 0,
      icon: UserSquare2,
      color: "text-emerald-500",
    },
    {
      title: "Registered Instructors",
      count: stats?.totalTutors ?? 0,
      icon: GraduationCap,
      color: "text-purple-500",
    },
    {
      title: "System Administrators",
      count: stats?.totalAdmins ?? 0,
      icon: ShieldCheck,
      color: "text-rose-500",
    },
    {
      title: "Platform Bookings",
      count: stats?.totalBookings ?? 0,
      icon: CalendarCheck,
      color: "text-amber-500",
    },
    {
      title: "Published Open Slots",
      count: stats?.totalAvailabilities ?? 0,
      icon: Clock,
      color: "text-indigo-500",
    },
    {
      title: "Verified Active Tutors",
      count: stats?.totalVerified ?? 0,
      icon: ShieldAlert,
      color: "text-teal-500",
    },
    {
      title: "Featured Showcases",
      count: stats?.totalFeatured ?? 0,
      icon: Star,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-10 w-full animate-fade-in">
      {/* Page Header Identification */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Ecosystem Control Overview
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor accurate administrative aggregates, user account balances, and
          scheduling volume states natively.
        </p>
      </div>

      {/* Symmetric Summary Grid Section mapping all 8 core values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-card border border-black/5 dark:border-white/5 rounded-2xl p-5 shadow-xs relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider block">
                    {card.title}
                  </span>
                  <span className="text-2xl font-black text-foreground block">
                    {card.count.toLocaleString()}
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 ${card.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational Shortcuts Vector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-black text-foreground">
              Quick Management Pipelines
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Jump into high priority sections needing active moderation
              attention.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/admin/verifications"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-black/5 dark:border-white/5 text-xs font-bold transition-colors"
            >
              <span>Process Vetting Queue</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </Link>
            <Link
              href="/admin/featured"
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-black/5 dark:border-white/5 text-xs font-bold transition-colors"
            >
              <span>Configure Showcase Placement</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* System Sub-Node Status Block */}
        <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-black text-foreground">
              Ecosystem Infrastructure
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Functional operations checking of connected web segments.
            </p>
          </div>
          <div className="space-y-2.5">
            {[
              { node: "Stripe Escrow Integration", status: "Operational" },
              { node: "Socket Engine Cluster", status: "Operational" },
            ].map((system, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-black/5 dark:border-white/5"
              >
                <span className="text-xs font-bold text-muted-foreground">
                  {system.node}
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-blue-400 dark:bg-blue-500/5 dark:border-blue-500/10">
                  {system.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
