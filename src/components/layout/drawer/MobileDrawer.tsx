"use client";

import { MobileNavLinks } from "./MobileNavLinks";
import { MobileAuthButtons } from "./MobileAuthButtons";
import { MobileUserProfile } from "./MobileUserProfile";
import { MobileUserActions } from "./MobileUserActions";

interface MobileDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
  isLoggedIn: boolean;
  session: any;
  userRole?: string;
}

export function MobileDrawer({
  isOpen,
  setIsOpen,
  pathname,
  isLoggedIn,
  session,
  userRole,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
      {/* 1. Core Role-Based Navigation Links */}
      <MobileNavLinks
        pathname={pathname}
        setIsOpen={setIsOpen}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
      />

      <div className="pt-4 mt-2 border-t border-border/60 flex flex-col gap-2">
        {!isLoggedIn ? (
          /* 2. Public Authentication Links */
          <MobileAuthButtons setIsOpen={setIsOpen} />
        ) : (
          /* 3. Authenticated Identity Card & Actions Panel */
          <div className="flex flex-col gap-2.5">
            <MobileUserProfile session={session} />
            <MobileUserActions setIsOpen={setIsOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
