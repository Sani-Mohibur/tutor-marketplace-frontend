"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MobileAuthButtonsProps {
  setIsOpen: (open: boolean) => void;
}

export function MobileAuthButtons({ setIsOpen }: MobileAuthButtonsProps) {
  return (
    <>
      <Link href="/login" onClick={() => setIsOpen(false)} passHref>
        <Button
          variant="outline"
          className="w-full text-sm font-bold tracking-wide h-10 rounded-xl cursor-pointer border-border/80 hover:bg-muted/50 transition-colors"
        >
          Log In
        </Button>
      </Link>

      <Link href="/register" onClick={() => setIsOpen(false)} passHref>
        <Button className="w-full text-sm font-bold tracking-wide h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-blue-600 dark:to-cyan-600 text-white cursor-pointer border-none">
          Sign Up
        </Button>
      </Link>
    </>
  );
}
