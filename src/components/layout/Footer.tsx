import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-300/80 dark:border-white/10 bg-gradient-to-b from-transparent via-slate-50/40 to-slate-100/60 dark:via-slate-950/20 dark:to-slate-950/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Brand Block */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="text-3xl font-bold tracking-tight text-foreground">
            Skill
            <span className="text-emerald-500 dark:text-blue-400">Bridge</span>
          </div>

          <p className="text-sm text-muted-foreground/80 max-w-2xl text-center md:text-left leading-relaxed">
            An elite ecosystem that connects learners with expert tutors.
            Students can browse tutor profiles, view availability, and book
            sessions instantly. Tutors can manage their profiles, set
            availability, and track their teaching sessions.
          </p>
        </div>

        <hr className="border-zinc-300/80 dark:border-white/10" />

        {/* Bottom Compliance Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          {/* Copyright */}
          <div className="text-muted-foreground font-medium tracking-tight">
            &copy; {currentYear} Skill Bridge. All rights reserved.
          </div>

          {/* Core Legal Routes */}
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200 hover:translate-y-[-1px]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-muted-foreground hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200 hover:translate-y-[-1px]"
            >
              Terms of Service
            </Link>

            <Link
              href="/contact"
              className="text-muted-foreground hover:text-emerald-600 dark:hover:text-blue-400 transition-colors duration-200 hover:translate-y-[-1px]"
            >
              Support Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
