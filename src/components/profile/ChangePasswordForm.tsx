"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isGoogleOnly, setIsGoogleOnly] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);


  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAuthMethods = async () => {
      try {
        const res = await fetch(`${API_BASE}/profile/auth-methods`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success && json.data) {
          const providers = json.data.providers || [];
          if (providers.includes("google") && !providers.includes("credential")) {
            setIsGoogleOnly(true);
          }
        }
      } catch (err) {
        console.error("Error fetching auth methods", err);
      } finally {
        setCheckingAuth(false);
      }
    };
    fetchAuthMethods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match.", {
        description: "Your new password and confirmation must be identical.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.changePassword({
        newPassword: formData.newPassword,
        currentPassword: formData.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error("Authentication Error", {
          description: error.message || "Failed to update password. Please check your current password.",
        });
      } else {
        toast.success("Security Updated", {
          description: "Your password has been securely rotated. Other active sessions have been revoked.",
        });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (err: any) {
      toast.error("Unexpected Error", {
        description: "An unexpected error occurred while rotating your security credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-sm max-w-2xl animate-fade-in space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
            <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-foreground">
              Security & Credentials
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              Update your password and securely rotate your authentication parameters.
            </p>
          </div>
        </div>
      </div>

      {checkingAuth ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
        </div>
      ) : isGoogleOnly ? (
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-border rounded-2xl flex flex-col items-center text-center space-y-3">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
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
          <p className="text-sm font-semibold text-foreground">
            Your account uses Google Sign-In.
          </p>
          <p className="text-xs text-muted-foreground">
            Password changes are not available for Google accounts.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-xs font-bold text-foreground">
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              required
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border-border focus-visible:ring-blue-500/50 focus-visible:border-blue-500"
              placeholder="Enter your current password"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-xs font-bold text-foreground">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                required
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border-border focus-visible:ring-blue-500/50 focus-visible:border-blue-500"
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-xs font-bold text-foreground">
                Confirm New Password
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                required
                value={formData.confirmNewPassword}
                onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                className="h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border-border focus-visible:ring-blue-500/50 focus-visible:border-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold tracking-wide transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Rotating Credentials...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
