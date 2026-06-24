"use client";

import Link from "next/link";
import { ROLES } from "@/constants/roles";

interface MobileNavLinksProps {
  pathname: string;
  setIsOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  userRole?: string;
}

export function MobileNavLinks({
  pathname,
  setIsOpen,
  isLoggedIn,
  userRole,
}: MobileNavLinksProps) {
  const isActive = (path: string) => pathname === path;
  const isTutor = userRole === ROLES.TUTOR;

  return (
    <>
      {isTutor ? (
        <Link
          href="/slots"
          onClick={() => setIsOpen(false)}
          className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
            isActive("/slots")
              ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          Manage Slots
        </Link>
      ) : (
        <Link
          href="/tutors"
          onClick={() => setIsOpen(false)}
          className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
            isActive("/tutors")
              ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          Find Tutors
        </Link>
      )}

      <Link
        href="/how-it-works"
        onClick={() => setIsOpen(false)}
        className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
          isActive("/how-it-works")
            ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        How It Works
      </Link>

      <Link
        href="/about"
        onClick={() => setIsOpen(false)}
        className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
          isActive("/about")
            ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        About
      </Link>

      {isLoggedIn ? (
        <>
          <Link
            href="/bookings"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
              isActive("/bookings")
                ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            Bookings
          </Link>

          {isTutor && (
            <Link
              href="/reviews"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                isActive("/reviews")
                  ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              Reviews
            </Link>
          )}
        </>
      ) : (
        <Link
          href="/register?role=tutor"
          onClick={() => setIsOpen(false)}
          className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
            isActive("/register")
              ? "text-emerald-500 dark:text-blue-400 bg-emerald-500/5 dark:bg-blue-500/5"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          Become a Tutor
        </Link>
      )}
    </>
  );
}
