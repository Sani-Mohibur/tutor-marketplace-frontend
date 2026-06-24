"use client";

import Link from "next/link";
import { ROLES } from "@/constants/roles";

interface NavLinksProps {
  pathname: string;
  isLoggedIn: boolean;
  userRole?: string;
}

export function NavLinks({ pathname, isLoggedIn, userRole }: NavLinksProps) {
  const isActive = (path: string) => pathname === path;
  const isTutor = userRole === ROLES.TUTOR;

  return (
    <div className="hidden md:flex items-center space-x-1">
      {/* Role Conditional Link: Students find tutors, Tutors manage slots */}
      {isTutor ? (
        <Link
          href="/slots"
          className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
            isActive("/slots")
              ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
        >
          Manage Slots
        </Link>
      ) : (
        <Link
          href="/tutors"
          className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
            isActive("/tutors")
              ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
        >
          Find Tutors
        </Link>
      )}

      <Link
        href="/how-it-works"
        className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/how-it-works")
            ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
        }`}
      >
        How It Works
      </Link>

      <Link
        href="/about"
        className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/about")
            ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
        }`}
      >
        About
      </Link>

      {isLoggedIn ? (
        <>
          <Link
            href="/bookings"
            className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
              isActive("/bookings")
                ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            Bookings
          </Link>

          {/* Extra Role Conditional Link: Tutors get Reviews */}
          {isTutor && (
            <Link
              href="/reviews"
              className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive("/reviews")
                  ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              Reviews
            </Link>
          )}
        </>
      ) : (
        <Link
          href="/register?role=tutor"
          className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
            isActive("/register")
              ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/15 dark:bg-blue-500/15"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
        >
          Become a Tutor
        </Link>
      )}
    </div>
  );
}
