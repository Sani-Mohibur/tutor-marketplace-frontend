"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ROLES } from "@/constants/roles";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Authenticating your workspace...");
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: session, error } = await authClient.getSession();

        if (error || !session) {
          toast.error("Failed to authenticate session.");
          router.push("/login");
          return;
        }

        const userRole = session.user.role;

        if (userRole === "pending") {
          // It's a new Google sign-up that hasn't finalized its role
          let storedRole = null;
          if (typeof window !== "undefined") {
            storedRole = localStorage.getItem("oauth_role");
          }

          if (storedRole && (storedRole === ROLES.STUDENT || storedRole === ROLES.TUTOR)) {
            setStatus("Finalizing account configuration...");
            await finalizeRole(storedRole);
          } else {
            // No role found (e.g. they came from the Login page instead of Register page)
            setShowRoleSelector(true);
            setStatus("Action required.");
          }
        } else {
          // Existing user with a resolved role
          setStatus("Access granted. Routing to dashboard...");
          routeToDashboard(userRole);
        }
      } catch (err) {
        toast.error("An error occurred during authentication.");
        router.push("/login");
      }
    };

    handleCallback();
  }, []);

  const finalizeRole = async (role: string) => {
    try {
      const res = await fetch(`${API_BASE}/profile/finalize-oauth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("oauth_role");
        }
        toast.success("Account setup complete!");
        // Update local session data so next page load has correct role
        await authClient.getSession();
        routeToDashboard(role);
      } else {
        toast.error(json.message || "Failed to finalize account.");
        router.push("/register");
      }
    } catch (err) {
      toast.error("Network error during finalization.");
      router.push("/register");
    }
  };

  const routeToDashboard = (role: string) => {
    setTimeout(() => {
      if (role === ROLES.TUTOR) {
        router.push("/slots");
      } else if (role === ROLES.STUDENT) {
        router.push("/tutors");
      } else if (role === ROLES.ADMIN || role === ROLES.SUPPORT_ADMIN) {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
      router.refresh();
    }, 800);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black">
      {!showRoleSelector ? (
        <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
          <p className="text-white/80 font-bold tracking-wide text-sm">{status}</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-black text-white">Select Account Type</h3>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              We noticed you're creating a new account. Please select how you want to use the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => finalizeRole("student")}
              className="w-full h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all flex items-center justify-center border border-zinc-700 hover:border-zinc-500 cursor-pointer"
            >
              Continue as Student
            </button>
            <button
              onClick={() => finalizeRole("tutor")}
              className="w-full h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all flex items-center justify-center border border-zinc-700 hover:border-zinc-500 cursor-pointer"
            >
              Continue as Tutor
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
