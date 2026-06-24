import RegisterForm from "@/components/auth/RegisterForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
      <main className="flex-grow w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Subtle decorative background accents for the premium look */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <Suspense
          fallback={
            <div className="text-xs font-bold tracking-wide text-muted-foreground animate-pulse">
              Constructing workspace instance...
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </main>
    </div>
  );
}
