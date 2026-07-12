"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Hero() {
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role;
  const isTutor = userRole === "tutor";

  const [stats, setStats] = useState({ totalTutors: 0, totalStudents: 0, totalSlots: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/public-stats`);
        if (!response.ok) return;
        const json = await response.json();
        if (json.success && json.data) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch public stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-slate-900 transition-colors duration-300">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-[2px] transition-all duration-300 dark:opacity-30"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />

      {/* Premium Adaptive Translucent Overlay Filter */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] dark:bg-slate-950/70" />

      {/* Content Layer */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center lg:px-8">
        <div className="max-w-4xl">
          {/* Headline with Brand Accent Color */}
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            {/* Bridge the Gap to{" "} */}
            Find the Right Tutor{" "}
            <span className="text-[#00bfa5] dark:text-[#00e5ff]">
              {/* Expert Knowledge */}
              Learn with Confidence
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-7 text-slate-900 dark:text-slate-300 drop-shadow-sm font-medium">
            {/* Connect instantly with verified elite tutors across any field.
            Secure your custom learning slot, track your interactive sessions,
            and scale your skills today. */}

            Find expert tutors for your learning needs, view their available
            time slots, book sessions easily, and improve your skills through a
            trusted platform designed for effective learning.
          </p>

          {/* Dynamic CTA Button */}
          <div className="mt-10 flex items-center justify-center">
            <Link href={isTutor ? "/slots" : "/tutors"} passHref>
              <button className="px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase text-slate-900 dark:text-white border border-slate-900/20 dark:border-white/20 hover:border-emerald-600 dark:hover:border-blue-400 transition-all duration-500 hover:scale-[1.02] active:scale-95 cursor-pointer backdrop-blur-sm">
                {isTutor ? "Manage Your Slots" : "Find Your Perfect Tutor"}
                <span className="group-hover:translate-x-1 transition-transform duration-300"> →</span>
              </button>
            </Link>
          </div>

          {/* Premium Statistic Cards */}
          <div className="mt-14 flex flex-wrap justify-center gap-8 md:gap-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {[
              { label: "Total Tutors", value: stats.totalTutors },
              { label: "Total Students", value: stats.totalStudents },
              { label: "Classes Completed", value: stats.totalSlots },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center group cursor-default">
                <span className="text-5xl font-black text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-blue-400">
                  {item.value}+
                </span>
                <span className="mt-1 text-[10px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-500 uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
}
