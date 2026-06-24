"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { NavLinks } from "./NavLinks";
import { UserDropdown } from "./UserDropdown";
import { BrandLogo } from "./BrandLogo";
import { MobileDrawer } from "./drawer/MobileDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  // Safely capture the dynamic user role string from the login session state
  const userRole = session?.user?.role;

  return (
    <nav className="w-full border-b border-border/60 bg-background/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1 text-lg font-black tracking-tight text-foreground group transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <BrandLogo />
              </div>

              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground group-hover:text-foreground transition-all duration-300">
                Skill
                <span className="text-emerald-500 dark:text-blue-400">
                  Bridge
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Central Links Component Extract */}
          <NavLinks
            pathname={pathname}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
          />

          {/* Desktop Utilities + Auth Interaction Area */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-border/40 bg-background/50 hover:bg-muted hover:text-foreground active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-[18px] h-[18px] text-muted-foreground" />
              ) : (
                <Sun className="w-[18px] h-[18px] text-yellow-500" />
              )}
            </Button>

            <div className="h-4 w-[1px] bg-border/60 mx-1" />

            {isPending ? (
              <div className="w-[150px] h-9" />
            ) : !isLoggedIn ? (
              <>
                <Link href="/login" passHref>
                  <Button
                    variant="ghost"
                    className="text-xs font-bold tracking-wide rounded-xl h-9 px-4 cursor-pointer border border-border/60 bg-background/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/register" passHref>
                  <Button className="text-xs font-bold tracking-wide rounded-xl h-9 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-400 dark:hover:to-cyan-400 text-white shadow-sm cursor-pointer border-none">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <UserDropdown session={session} />
            )}
          </div>

          {/* Mobile Layout Row Buttons */}
          <div className="flex md:hidden items-center space-x-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-border/40 bg-background/40 cursor-pointer"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay Extract */}
      <MobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        session={session}
        userRole={userRole}
      />
    </nav>
  );
}
