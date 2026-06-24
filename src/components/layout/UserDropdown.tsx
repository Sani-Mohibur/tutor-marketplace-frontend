"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserDropdownProps {
  session: any;
}

export function UserDropdown({ session }: UserDropdownProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
      <Link href="/dashboard" passHref>
        <Button
          variant="outline"
          className="text-xs font-bold tracking-wide rounded-xl h-9 gap-1.5 cursor-pointer border-border/60 hover:bg-muted/40"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </Button>
      </Link>

      {/* Relative wrapper grouping */}
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none cursor-pointer hover:scale-105 active:scale-95 transition-transform block"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-9 h-9 rounded-xl object-cover border border-border/80 shadow-inner"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-blue-500/10 dark:to-cyan-500/10 text-emerald-600 dark:text-blue-400 flex items-center justify-center text-xs font-black border border-emerald-500/20 dark:border-blue-500/20 shadow-xs">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </button>

        {/* Floating Dropdown Box */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-4 w-52 rounded-xl bg-popover text-popover-foreground border border-border shadow-xl py-2 z-[9999] text-left animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Updated typography text constraints */}
            <div className="px-3.5 py-2 border-b border-border/60 max-w-full">
              <p className="text-sm font-bold text-foreground truncate">
                {session?.user?.name || "User Account"}
              </p>
              <p className="text-xs font-medium text-muted-foreground mt-0.5 truncate">
                {session?.user?.email}
              </p>
            </div>

            <div className="p-1 space-y-0.5">
              <Link
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <User className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-500" />
                My Profile
              </Link>

              <button
                onClick={async () => {
                  setIsDropdownOpen(false);
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("Logged out successfully. See you soon!");
                        router.push("/login");
                        router.refresh();
                      },
                    },
                  });
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
