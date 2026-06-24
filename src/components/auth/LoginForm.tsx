"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLES } from "@/constants/roles";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        fetchOptions: {
          onSuccess: async (ctx) => {
            toast.success("Welcome back! Access granted.");

            // Pull the user role from the response context or auth client state
            const userRole = ctx?.data?.user?.role;

            setTimeout(() => {
              if (userRole === ROLES.TUTOR) {
                router.push("/slots");
              } else if (userRole === ROLES.STUDENT) {
                router.push("/tutors");
              } else if (userRole === ROLES.ADMIN) {
                router.push("/admin");
              }

              router.refresh();
            }, 800);
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Invalid security token or credentials.",
            );
          },
        },
      });
    } catch (err: any) {
      // Fallback for unexpected structural connection drops
      toast.error("Network connection refused. Check backend lifecycle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full max-w-md">
      {/* Premium Ambient Background Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 dark:from-blue-500 dark:via-cyan-500 dark:to-indigo-600 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />

      {/* Glassmorphism Card Wrapper */}
      <div className="relative border border-border/80 bg-background/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Sign In
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            Enter your credentials to manage your learning workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase"
            >
              Email Hub
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-11 rounded-xl bg-background/50 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all duration-300"
              placeholder="name@domain.com"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase"
              >
                Security Token
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="h-11 rounded-xl bg-background/50 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 dark:from-blue-600 dark:via-cyan-600 dark:to-indigo-600 hover:from-teal-500 hover:to-indigo-500 dark:hover:from-blue-500 dark:hover:to-indigo-500 text-white font-bold tracking-wide shadow-lg shadow-blue-600/10 transition-all duration-300 mt-4 cursor-pointer"
          >
            {loading ? "Authenticating..." : "Authorize Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
