import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full py-16 md:py-20 border border-border/50 dark:border-blue-500/20 bg-card/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl my-12 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 shadow-sm relative overflow-hidden">
      {/* Premium background soft ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-colors duration-500" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-accent/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none transition-colors duration-500" />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-6 relative z-10">
        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Ready to Level Up Your Technical Skills?
        </h2>

        <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed mx-auto">
          Join a community of scale-up engineers, core developers, and eager
          learners. Book structured mentoring slots or create an instructor
          profile to share your expertise today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-6 text-sm font-semibold text-white active:scale-[0.98] transition-all w-full sm:w-auto shadow-sm"
          >
            Get Started as Student
          </Link>
          <Link
            href="/register?role=tutor"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border/50 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 px-6 text-sm font-medium text-foreground active:scale-[0.98] transition-all w-full sm:w-auto shadow-sm"
          >
            Apply to Teach
          </Link>
        </div>
      </div>
    </section>
  );
}
