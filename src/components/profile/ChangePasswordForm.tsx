"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

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
    </div>
  );
}
