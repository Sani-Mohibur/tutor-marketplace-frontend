"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      await authClient.resetPassword({
        newPassword: formData.password,
        token: token || "",
        fetchOptions: {
          onSuccess: () => {
            setSuccess(true);
            toast.success("Password successfully reset.");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          },
          onError: (ctx: any) => {
            toast.error(
              ctx.error.message ||
                "Failed to reset password. The link might be expired.",
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
    <div className="relative group w-full max-w-md">
      {/* Premium Ambient Background Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 dark:from-blue-500 dark:via-cyan-500 dark:to-indigo-600 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />

      {/* Glassmorphism Card Wrapper */}
      <div className="relative border border-border/80 bg-background/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Reset Password
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            {success
              ? "Your password has been changed successfully. Redirecting..."
              : "Enter your new password below."}
          </p>
        </div>

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase"
              >
                New Password
              </Label>
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

            <div className="space-y-1.5">
              <Label
                htmlFor="confirmPassword"
                className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
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
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
