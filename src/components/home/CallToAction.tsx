import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full py-16 md:py-20 border border-card-border bg-card rounded-2xl my-12 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 shadow-sm relative overflow-hidden">
      {/* Premium background soft ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-6 relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Ready to Level Up Your Technical Skills?
        </h2>

        <p className="max-w-xl text-sm md:text-base text-muted-text leading-relaxed">
          Join a community of scale-up engineers, core developers, and eager
          learners. Book structured mentoring slots or create an instructor
          profile to share your expertise today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-accent px-6 text-sm font-semibold text-white hover:bg-brand-hover active:scale-[0.98] transition-all w-full sm:w-auto shadow-sm"
          >
            Get Started as Student
          </Link>
          <Link
            href="/register?role=tutor"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-card-border bg-muted-surface px-6 text-sm font-medium text-foreground hover:bg-card-border active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            Apply to Teach
          </Link>
        </div>
      </div>
    </section>
  );
}
