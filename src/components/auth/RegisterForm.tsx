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
      // 1. Create the user account with proper error hooks
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
        fetchOptions: {
          onError: (ctx: any) => {
            toast.error(ctx.error.message || "Email already exists.");
            setLoading(false);
          },
          onSuccess: async () => {
            toast.success("Account constructed! Authenticating session...");

            // 2. Only sign them in if the registration succeeded
            await authClient.signIn.email({
              email: formData.email,
              password: formData.password,
              callbackURL: "/profile/edit",
            });

            router.refresh();
          },
        },
      } as any);
    } catch (err: any) {
      toast.error("An authentication error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full max-w-md mx-auto">
      {/* Transparent Wrapper with Border */}
      <div className="relative bg-transparent border border-white/20 rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Create account
          </h1>
          <p className="text-xs font-medium text-white/70">
            Join the engineering marketplace to unlock absolute scale.
          </p>
        </div>

        {/* Premium Pill Toggles */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-black/20 border border-white/10 rounded-xl relative">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`h-9 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${role === "student"
              ? "bg-white/20 text-white shadow-md shadow-black/20"
              : "text-white/60 hover:text-white"
              }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("tutor")}
            className={`h-9 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${role === "tutor"
              ? "bg-white/20 text-white shadow-md shadow-black/20"
              : "text-white/60 hover:text-white"
              }`}
          >
            Mentor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5 text-center">
            <Label
              htmlFor="name"
              className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase"
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
              className="h-11 rounded-xl bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-1.5 text-center">
            <Label
              htmlFor="email"
              className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-11 rounded-xl bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1.5 text-center">
            <Label
              htmlFor="password"
              className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="h-11 rounded-xl bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 transition-all duration-300 mt-2 cursor-pointer border-none"
          >
            {loading ? "Constructing Account..." : "Initialize Setup"}
          </Button>
        </form>
      </div>
    </div>
  );
}
