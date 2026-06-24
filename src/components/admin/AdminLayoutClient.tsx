"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Star,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  FolderKanban,
  CalendarCheck,
  Clock,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);

      // Execute the sign out command natively
      await authClient.signOut();

      // Dispatch success toast and route safely
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {
      console.error("Sign out transaction failed:", err);
      toast.error("Logout failed", {
        description: err?.message || "An unknown transmission issue occurred.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "User Directory", href: "/admin/users", icon: Users },
    { name: "Vetting Queue", href: "/admin/verifications", icon: ShieldCheck },
    { name: "Featured Tutors", href: "/admin/featured", icon: Star },
    // Added operational control links seamlessly below
    { name: "Categories", href: "/admin/categories", icon: FolderKanban },
    { name: "Booking Logs", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Availabilities", href: "/admin/availabilities", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
      {/* 1. Desktop Sidebar Component Container */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r border-black/5 dark:border-white/5 fixed inset-y-0 left-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-black/5 dark:border-white/5">
          <span className="text-base font-black tracking-tight text-foreground">
            Skill
            <span className="text-emerald-500 dark:text-blue-400">Bridge</span>
            <span className="ml-1.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              Admin
            </span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 h-10 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Utility Controls Block */}
        <div className="p-4 border-t border-black/5 dark:border-white/5 space-y-2">
          {/* Active Theme Switcher Action Toggle Row */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-4 h-10 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span>Interface Theme</span>
            </div>
            <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground/60">
              {theme}
            </span>
          </button>

          <button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="flex items-center gap-3 w-full px-4 h-10 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? "Exiting..." : "Exit Panel"}
          </button>
        </div>
      </aside>

      {/* 2. Mobile Nav Header Top-Bar */}
      <div className="md:hidden flex items-center justify-between w-full h-16 px-4 bg-background border-b border-black/5 dark:border-white/5 fixed top-0 inset-x-0 z-30">
        <span className="text-sm font-black text-foreground">
          SkillBridge <span className="text-red-500">Admin</span>
        </span>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Switch Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-muted text-foreground cursor-pointer flex items-center justify-center"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg bg-muted text-foreground cursor-pointer flex items-center justify-center"
          >
            {isMobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Draw Overlay Menu */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-background/95 backdrop-blur-md pt-20 px-4 space-y-2 flex flex-col justify-between pb-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 h-12 rounded-xl text-xs font-bold ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-2">
            <button
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="flex items-center gap-3 w-full px-4 h-12 rounded-xl text-xs font-bold text-destructive bg-destructive/5 border border-destructive/10 cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-4.5 h-4.5" />
              {isLoggingOut ? "Exiting..." : "Exit Panel"}
            </button>
          </div>
        </div>
      )}

      {/* 4. Scrollable Main Layout Display Viewport */}
      <div className="flex-1 md:pl-64 pt-16 md:pt-0 flex flex-col min-w-0">
        <main className="flex-grow p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
