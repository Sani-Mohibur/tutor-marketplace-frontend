"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import {
  format, subDays, subWeeks, subMonths, subYears, isAfter,
  startOfDay, startOfWeek, startOfMonth, startOfYear,
  eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, eachYearOfInterval
} from "date-fns";

type TimeFilter = "Day" | "Week" | "Month" | "Year";

interface RawUserData {
  role: "student" | "tutor" | "admin";
  createdAt: string;
}

export const UserGrowthChart = () => {
  const [data, setData] = useState<RawUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<TimeFilter>("Month");

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiBase}/admin/users?chart=true`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data || []);
        }
      } catch (err) {
        console.error("Failed fetching user growth data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [apiBase]);

  const aggregatedData = useMemo(() => {
    if (!data.length) return [];

    const now = new Date();
    let cutoffDate = new Date();

    if (filter === "Day") cutoffDate = subDays(now, 15);
    if (filter === "Week") cutoffDate = subWeeks(now, 8);
    if (filter === "Month") cutoffDate = subMonths(now, 12);
    if (filter === "Year") cutoffDate = subYears(now, 6);

    // Filter out users before the cutoff
    const filteredUsers = data.filter((user) =>
      isAfter(new Date(user.createdAt), cutoffDate)
    );

    // Grouping mapping
    const grouped = new Map<string, { student: number; tutor: number }>();

    // Pre-fill the map with 0s to ensure contiguous dates
    if (filter === "Day") {
      eachDayOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(format(startOfDay(date), "MMM dd"), { student: 0, tutor: 0 });
      });
    } else if (filter === "Week") {
      eachWeekOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(`Week of ${format(startOfWeek(date), "MMM dd")}`, { student: 0, tutor: 0 });
      });
    } else if (filter === "Month") {
      eachMonthOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(format(startOfMonth(date), "MMM yyyy"), { student: 0, tutor: 0 });
      });
    } else if (filter === "Year") {
      eachYearOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(format(startOfYear(date), "yyyy"), { student: 0, tutor: 0 });
      });
    }

    filteredUsers.forEach((user) => {
      if (user.role !== "student" && user.role !== "tutor") return;

      const date = new Date(user.createdAt);
      let key = "";

      if (filter === "Day") {
        key = format(startOfDay(date), "MMM dd");
      } else if (filter === "Week") {
        key = `Week of ${format(startOfWeek(date), "MMM dd")}`;
      } else if (filter === "Month") {
        key = format(startOfMonth(date), "MMM yyyy");
      } else if (filter === "Year") {
        key = format(startOfYear(date), "yyyy");
      }

      if (grouped.has(key)) {
        const current = grouped.get(key)!;
        if (user.role === "student") current.student += 1;
        if (user.role === "tutor") current.tutor += 1;
      }
    });

    // Create an array and sort by actual date
    const result = Array.from(grouped.entries()).map(([name, counts]) => ({
      name,
      ...counts,
    }));

    return result;
  }, [data, filter]);

  return (
    <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs p-6 mb-8 w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-foreground">
            Platform Growth Matrix
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Track student and tutor registrations over time.
          </p>
        </div>
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full sm:w-auto">
          {(["Day", "Week", "Month", "Year"] as TimeFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 sm:flex-none text-xs font-bold px-4 py-1.5 rounded-lg transition-all cursor-pointer ${filter === t
                ? "bg-white dark:bg-slate-800 text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[350px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">
              Aggregating growth metrics...
            </p>
          </div>
        ) : aggregatedData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No data available for the selected period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={aggregatedData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-black/5 dark:text-white/5"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                dy={10}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                }}
                itemStyle={{
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", fontWeight: 700, paddingTop: "20px" }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="student"
                name="Students"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="tutor"
                name="Tutors"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
