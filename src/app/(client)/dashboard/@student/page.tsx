"use client";

import StudentDashboardView from "@/components/dashboard/StudentDashboard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StudentDashboardView />
    </main>
  );
}
