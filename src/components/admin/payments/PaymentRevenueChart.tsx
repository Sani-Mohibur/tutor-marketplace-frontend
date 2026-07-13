"use client";

import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import {
  format, subDays, subWeeks, subMonths, subYears, isAfter,
  startOfDay, startOfWeek, startOfMonth, startOfYear,
  eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, eachYearOfInterval
} from "date-fns";

type TimeFilter = "Day" | "Week" | "Month" | "Year";

interface RawPaymentData {
  amount: number | null;
  currency: string | null;
  createdAt: string;
}

export const PaymentRevenueChart = () => {
  const [data, setData] = useState<RawPaymentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<TimeFilter>("Month");

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${apiBase}/admin/payments?chart=true`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data || []);
        }
      } catch (err) {
        console.error("Failed fetching payment revenue data:", err);
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

    const filteredPayments = data.filter((payment) =>
      isAfter(new Date(payment.createdAt), cutoffDate)
    );

    const grouped = new Map<string, { revenue: number }>();

    if (filter === "Day") {
      eachDayOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(format(startOfDay(date), "MMM dd"), { revenue: 0 });
      });
    } else if (filter === "Week") {
      eachWeekOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(`Week of ${format(startOfWeek(date), "MMM dd")}`, { revenue: 0 });
      });
    } else if (filter === "Month") {
      eachMonthOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(format(startOfMonth(date), "MMM yyyy"), { revenue: 0 });
      });
    } else if (filter === "Year") {
      eachYearOfInterval({ start: cutoffDate, end: now }).forEach((date) => {
        grouped.set(format(startOfYear(date), "yyyy"), { revenue: 0 });
      });
    }

    filteredPayments.forEach((payment) => {
      if (payment.amount == null) return;
      const date = new Date(payment.createdAt);
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
        current.revenue += payment.amount;
      }
    });

    return Array.from(grouped.entries()).map(([name, counts]) => ({
      name,
      ...counts,
    }));
  }, [data, filter]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-xl shadow-sm">
          <p className="text-xs font-bold text-muted-foreground mb-1">{label}</p>
          <p className="text-sm font-black text-emerald-500">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs p-6 w-full h-[450px] flex flex-col animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 shrink-0">
        <div>
          <h2 className="text-xl font-black tracking-tight text-foreground">
            Revenue Over Time
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Track total payment volume and financial growth.
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

      <div className="flex-1 w-full min-h-[300px]">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">
              Aggregating revenue metrics...
            </p>
          </div>
        ) : aggregatedData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No payment data available for the selected period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.1 }} />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
