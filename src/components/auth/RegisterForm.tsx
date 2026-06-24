"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole =
    searchParams.get("role") === "tutor" ? "tutor" : "student";

  const [role, setRole] = useState<"student" | "tutor">(initialRole);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create the user account
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
      } as any);

      toast.success("Account constructed! Authenticating session...");

      // 2. Immediately sign them in to generate the session cookies
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/profile/edit",
      });

      // toast.success("Access authorized! Redirecting...");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full max-w-md">
      {/* Premium Ambient Background Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 dark:from-blue-500 dark:via-cyan-500 dark:to-blue-600 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />

      {/* Glassmorphism Card Wrapper */}
      <div className="relative border border-border/80 bg-background/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Create account
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            Join the engineering marketplace to unlock absolute scale.
          </p>
        </div>

        {/* Premium Pill Toggles */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-muted border border-border/40 rounded-xl relative">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`h-9 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
              role === "student"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-blue-600 dark:to-cyan-600 text-white shadow-md shadow-emerald-900/10 dark:shadow-blue-900/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Student Track
          </button>
          <button
            type="button"
            onClick={() => setRole("tutor")}
            className={`h-9 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
              role === "tutor"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-blue-600 dark:to-cyan-600 text-white shadow-md shadow-emerald-900/10 dark:shadow-blue-900/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Expert Mentor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase"
            >
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-11 rounded-xl bg-background/50 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:ring-blue-500/20 dark:focus-visible:border-blue-500 transition-all duration-300"
              placeholder="Sani Mohibur"
            />
          </div>

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
              className="h-11 rounded-xl bg-background/50 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:ring-blue-500/20 dark:focus-visible:border-blue-500 transition-all duration-300"
              placeholder="name@domain.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase"
            >
              Security Token
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="h-11 rounded-xl bg-background/50 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:ring-blue-500/20 dark:focus-visible:border-blue-500 transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 dark:from-blue-600 dark:via-cyan-600 dark:to-blue-600 hover:from-emerald-500 hover:to-teal-500 dark:hover:from-blue-500 dark:hover:to-cyan-500 text-white font-bold tracking-wide shadow-lg shadow-emerald-600/10 dark:shadow-blue-600/10 transition-all duration-300 mt-4 cursor-pointer"
          >
            {loading ? "Constructing Account..." : "Initialize Setup"}
          </Button>
        </form>
      </div>
    </div>
  );
}
