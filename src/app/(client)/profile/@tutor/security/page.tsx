import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { Settings } from "lucide-react";

export default function TutorSecurityPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-6 max-w-4xl mx-auto w-full space-y-8 text-zinc-900 dark:text-zinc-100">
      <div className="w-full flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-500 dark:text-blue-400" />
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            Instructor Security Hub
          </h2>
        </div>
      </div>

      <ChangePasswordForm />
    </main>
  );
}
