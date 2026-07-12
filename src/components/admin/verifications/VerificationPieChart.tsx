"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Loader2 } from "lucide-react";

interface StatsData {
  totalTutors: number;
  totalVerified: number;
}

export const VerificationPieChart = () => {
  const [data, setData] = useState<{ name: string; value: number; color: string; percentage: string }[]>([]);
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
        
        if (json.success && json.data) {
          const stats = json.data as StatsData;
          const pending = stats.totalTutors - stats.totalVerified;
          const total = stats.totalTutors || 1; // Prevent divide by zero
          
          setData([
            { 
              name: "Verified Tutors", 
              value: stats.totalVerified, 
              color: "#10b981",
              percentage: ((stats.totalVerified / total) * 100).toFixed(1)
            }, // Emerald
            { 
              name: "Pending Verification", 
              value: pending, 
              color: "#f59e0b",
              percentage: ((pending / total) * 100).toFixed(1)
            }, // Amber
          ]);
        }
      } catch (err) {
        console.error("Failed fetching verification stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [apiBase]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border p-3 rounded-xl shadow-xs">
          <p className="text-xs font-black text-foreground mb-1">{data.name}</p>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium" style={{ color: data.color }}>
              Count: {data.value}
            </p>
            <p className="text-xs font-medium" style={{ color: data.color }}>
              Percentage: {data.percentage}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs p-6 mb-8 w-full animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tight text-foreground">
          Verification Status
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Current distribution of tutor approvals.
        </p>
      </div>

      <div className="h-[250px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-xs text-muted-foreground font-medium">
              Loading distribution data...
            </p>
          </div>
        ) : data.length === 0 || (data[0].value === 0 && data[1].value === 0) ? (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No tutor data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: "11px", fontWeight: 700 }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
