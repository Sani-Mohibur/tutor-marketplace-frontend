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
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/auth/callback",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        fetchOptions: {
          onSuccess: async (ctx: any) => {
            toast.success("Welcome back! Access granted.");

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
          onError: (ctx: any) => {
            setShowForgotPassword(true); // Show button on failure
            toast.error(
              ctx.error.message || "Invalid security token or credentials.",
            );
          },
        },
      });
    } catch (err: any) {
      toast.error("Network connection refused. Check backend lifecycle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full max-w-md mx-auto">
      {/* Transparent Wrapper with Border */}
      <div className="relative bg-transparent border border-white/20 rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Sign In
          </h1>
          <p className="text-xs font-medium text-white/70">
            Enter your credentials to manage your learning workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {showForgotPassword && (
              <div className="flex justify-center pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="cursor-pointer text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({ email: "student@gmail.com", password: "12345678" })}
              className="cursor-pointer flex-1 rounded-xl border-white/20 text-xs font-bold text-white bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
            >
              Demo as Student
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({ email: "tutor@gmail.com", password: "12345678" })}
              className="cursor-pointer flex-1 rounded-xl border-white/20 text-xs font-bold text-white bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
            >
              Demo as Tutor
            </Button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 transition-all duration-300 mt-2 cursor-pointer border-none"
          >
            {loading ? "Authenticating..." : "Authorize Login"}
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
    </div>
  );
}
