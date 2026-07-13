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
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  const handleGoogleSignIn = () => {
    setShowRoleModal(true);
  };

  const confirmGoogleRole = async (selectedRole: "student" | "tutor") => {
    setShowRoleModal(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("oauth_role", selectedRole);
    }
    
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/auth/callback",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.", {
        description: "Please ensure both password fields are identical.",
      });
      return;
    }

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

          <div className="space-y-1.5 text-center">
            <Label
              htmlFor="confirmPassword"
              className="text-[10px] font-extrabold tracking-widest text-white/80 uppercase"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="h-11 rounded-xl bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
              placeholder="Confirm your password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 transition-all duration-300 mt-2 cursor-pointer border-none"
          >
            {loading ? "Constructing Account..." : "Initialize Setup"}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-white/50 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-11 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100 font-bold tracking-wide shadow-lg shadow-white/5 transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </form>
      </div>

      {/* Role Confirmation Modal for Google OAuth */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-black text-white">Select Account Type</h3>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                Before continuing with Google, please confirm how you want to use the platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => confirmGoogleRole("student")}
                className="w-full h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all flex items-center justify-center border border-zinc-700 hover:border-zinc-500 cursor-pointer"
              >
                Register as Student
              </button>
              <button
                onClick={() => confirmGoogleRole("tutor")}
                className="w-full h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all flex items-center justify-center border border-zinc-700 hover:border-zinc-500 cursor-pointer"
              >
                Register as Tutor
              </button>
            </div>
            
            <button
              onClick={() => setShowRoleModal(false)}
              className="w-full text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer pt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
