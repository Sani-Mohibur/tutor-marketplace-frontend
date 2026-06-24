"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface MobileUserActionsProps {
  setIsOpen: (open: boolean) => void;
}

export function MobileUserActions({ setIsOpen }: MobileUserActionsProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    setIsOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully. See you soon!");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      <Link href="/profile" onClick={() => setIsOpen(false)} passHref>
        <Button
          variant="outline"
          className="w-full text-sm font-bold tracking-wide h-10 rounded-xl gap-2 cursor-pointer border-border/60 justify-start px-4"
        >
          <User className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
          My Profile
        </Button>
      </Link>

      <Link href="/dashboard" onClick={() => setIsOpen(false)} passHref>
        <Button
          variant="outline"
          className="w-full text-sm font-bold tracking-wide h-10 rounded-xl gap-2 cursor-pointer border-border/60 justify-start px-4"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Button>
      </Link>

      <Button
        variant="ghost"
        onClick={handleSignOut}
        className="w-full text-sm font-bold tracking-wide h-10 rounded-xl text-destructive hover:bg-destructive/5 cursor-pointer flex items-center justify-start px-4 gap-2"
      >
        <LogOut className="w-4 h-4" />
        Disconnect Account
      </Button>
    </>
  );
}
