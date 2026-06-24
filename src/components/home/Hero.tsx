export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-slate-900 transition-colors duration-300">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-[2px] transition-all duration-300 dark:opacity-30"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />

      {/* Premium Adaptive Translucent Overlay Filter */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] dark:bg-slate-950/70" />

      {/* Content Layer */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-6 text-center lg:px-8">
        <div className="max-w-4xl">
          {/* Headline with Brand Accent Color */}
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl drop-shadow-md">
            Bridge the Gap to{" "}
            <span className="text-[#00bfa5] dark:text-[#00e5ff]">
              Expert Knowledge
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 text-slate-200 dark:text-slate-300 drop-shadow-sm font-medium">
            Connect instantly with verified elite tutors across any field.
            Secure your custom learning slot, track your interactive sessions,
            and scale your skills today.
          </p>
        </div>
      </div>
    </section>
  );
}
