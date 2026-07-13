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


        </form>
      </div>
    </div>
  );
}
