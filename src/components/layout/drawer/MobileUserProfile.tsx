"use client";

interface MobileUserProfileProps {
  session: any;
}

export function MobileUserProfile({ session }: MobileUserProfileProps) {
  const user = session?.user;

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/40">
      {user?.image ? (
        <img
          src={user.image}
          alt={user.name || "User"}
          className="w-10 h-10 rounded-xl object-cover border border-border"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-500 dark:text-blue-400 flex items-center justify-center text-sm font-black border border-emerald-500/20 dark:border-blue-500/20">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xs font-bold text-foreground truncate max-w-[180px]">
          {user?.name || "Workspace Member"}
        </span>
        <span className="text-[10px] text-muted-foreground truncate max-w-[180px]">
          {user?.email}
        </span>
      </div>
    </div>
  );
}
