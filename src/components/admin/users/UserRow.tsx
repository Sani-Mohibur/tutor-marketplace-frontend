"use client";

import { Ban, CheckCircle } from "lucide-react";

interface UserRowProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    banned: boolean;
    createdAt: string;
  };
  onToggleBan: (id: string, currentBanStatus: boolean) => void;
  isActionLoading: string | null;
}

export function UserRow({ user, onToggleBan, isActionLoading }: UserRowProps) {
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isMutating = isActionLoading === user.id;

  return (
    <tr className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors">
      {/* Column 1: Account Identity */}
      <td className="px-6 py-4">
        <div className="space-y-0.5">
          <div className="font-black text-foreground">{user.name}</div>
          <div className="text-[11px] text-muted-foreground font-medium">
            {user.email}
          </div>
        </div>
      </td>

      {/* Column 2: Role Authorization Badge */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center text-[10px] font-black tracking-wide px-2 py-0.5 rounded border capitalize ${
            user.role === "tutor"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : user.role === "admin"
                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Column 3: Platform Security State */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
            !user.banned
              ? "text-emerald-600 dark:text-blue-500"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full fill-current ${
              !user.banned ? "bg-emerald-500 dark:bg-blue-500" : "bg-red-500"
            }`}
          />
          {user.banned ? "BANNED" : "ACTIVE"}
        </span>
      </td>

      {/* Column 4: Enrolled Date */}
      <td className="px-6 py-4 text-muted-foreground font-medium">
        {formattedDate}
      </td>

      {/* Column 5: Action Actions Controls */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {user.role === "admin" ? (
            <span className="text-[10px] font-medium text-muted-foreground italic">
              Protected
            </span>
          ) : user.banned ? (
            <button
              disabled={isMutating}
              onClick={() => onToggleBan(user.id, user.banned)}
              className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-emerald-500/10 hover:text-emerald-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-3.5 h-3.5" />{" "}
              {isMutating ? "Processing..." : "Lift Ban"}
            </button>
          ) : (
            <button
              disabled={isMutating}
              onClick={() => onToggleBan(user.id, user.banned)}
              className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            >
              <Ban className="w-3.5 h-3.5" />{" "}
              {isMutating ? "Processing..." : "Suspend"}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
