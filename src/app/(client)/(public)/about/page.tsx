"use client";

import {
  Zap,
  ShieldCheck,
  Cpu,
  Code2,
  SearchCode,
  GitBranch,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      {/* 1. PREMIUM HEADER CONTAINER - EXACT DESIGN MATCH */}
      <div className="w-full bg-gradient-to-br from-[#d0e7ff] via-[#e3f2fd] to-[#f0f4f8] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#090d16] dark:to-[#020617] border border-blue-300/40 dark:border-border/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="hidden dark:block absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <section className="text-center space-y-4 max-w-3xl mx-auto py-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 dark:bg-blue-500/10 text-emerald-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 dark:border-blue-500/20">
            <Zap className="w-3.5 h-3.5" /> Bridging the Gap in Engineering
            Expertise
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Our Identity &{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 bg-clip-text text-transparent">
              Vision
            </span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            We are building the elite, on-demand mentorship layer for software
            engineers worldwide. Decoupling traditional learning barriers
            through strict engineering principles.
          </p>
        </section>
      </div>

      {/* 2. OUR MISSION STATEMENT */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-blue-500">
          The Mission
        </h2>
        <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-relaxed">
          "To democratize production-ready knowledge. We believe software
          engineers shouldn't get stuck behind broken documentation or
          trial-and-error loops. By establishing direct, transactional access to
          verified masters, we shrink project lifecycles from weeks to minutes."
        </p>
        <div className="w-12 h-0.5 bg-border mx-auto mt-6" />
      </section>

      {/* 3. THE ENGINEERING MANIFESTO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-teal-500 dark:text-blue-500">
            Our Manifesto
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Architectural Mastery Over Raw Memorization
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Modern coding instruction is flooded with generic boilerplates that
            fail in high-throughput production environments. At Skill Bridge, we
            value structural system safety, strict logic tracking, and data
            normalization.
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Our platform shifts the paradigm from temporary syntax copy-pasting
            to long-term architectural understanding, preparing engineers to
            build scalable software.
          </p>
        </div>
        <div className="bg-muted/40 border border-border/60 rounded-2xl p-6 font-mono text-[11px] text-muted-foreground space-y-2 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-500 dark:text-blue-500">
            <Terminal className="w-3.5 h-3.5" />{" "}
            <span>skillbridge-manifesto.ts</span>
          </div>
          <p className="text-foreground/70">
            const engineeringPhilosophy = &#123;
          </p>
          <p className="pl-4">syntaxCopyPaste: false,</p>
          <p className="pl-4">systemDesignValidation: true,</p>
          <p className="pl-4">runtimeEfficiency: "O(1) Access",</p>
          <p className="pl-4 text-emerald-500 dark:text-blue-500">
            mentorshipPipeline: "On-Demand Vetted Masters"
          </p>
          <p className="text-foreground/70">&#125;;</p>
        </div>
      </section>

      {/* 4. CORE ARCHITECTURAL VALUES GRID */}
      <section className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
            Our Foundational Values
          </h3>
          <p className="text-muted-foreground text-xs">
            The underlying constraints governing our platform actions daily.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border/50 p-6 rounded-2xl space-y-4 hover:border-emerald-500/20 dark:hover:border-blue-500/20 transition-all shadow-xs">
            <Cpu className="w-5 h-5 text-emerald-500 dark:text-blue-500" />
            <h4 className="text-sm font-bold text-foreground">
              Uncompromising Quality
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              No generic profiles allowed. Every single entry inside our user
              indexing registry represents an active, top-tier professional
              holding verified deployment experience.
            </p>
          </div>
          <div className="bg-card border border-border/50 p-6 rounded-2xl space-y-4 hover:border-teal-500/20 dark:hover:border-blue-500/20 transition-all shadow-xs">
            <ShieldCheck className="w-5 h-5 text-teal-500 dark:text-blue-500" />
            <h4 className="text-sm font-bold text-foreground">
              Absolute Security
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Trust is secured natively via automated financial holds. Our
              custom Stripe workflows ensure transactions are locked cleanly for
              3 days to protect all marketplace users.
            </p>
          </div>
          <div className="bg-card border border-border/50 p-6 rounded-2xl space-y-4 hover:border-emerald-500/20 dark:hover:border-blue-500/20 transition-all shadow-xs">
            <Code2 className="w-5 h-5 text-emerald-500 dark:text-blue-500" />
            <h4 className="text-sm font-bold text-foreground">
              Technical Transparency
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Straightforward backend tracking logic rules. All multi-query
              category parameter structures match case-insensitively directly
              against clean PostgreSQL row arrays.
            </p>
          </div>
        </div>
      </section>

      {/* 5. THE MENTORSHIP LIFECYCLE TRACK */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
            The Mentorship Maturity Track
          </h3>
          <p className="text-muted-foreground text-xs">
            How engineering relationships scale over time through our
            micro-session channels.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative before:hidden md:before:block before:absolute before:top-12 before:left-1/6 before:right-1/6 before:h-px before:bg-border before:z-0">
          <div className="bg-background relative z-10 text-center space-y-3 p-4">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center mx-auto text-xs font-bold text-emerald-500 dark:text-blue-500 shadow-xs">
              01
            </div>
            <h5 className="text-xs font-bold text-foreground">
              1. High-Fidelity Review
            </h5>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Targeted logic investigation identifying critical runtime faults
              and code bottlenecks.
            </p>
          </div>
          <div className="bg-background relative z-10 text-center space-y-3 p-4">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center mx-auto text-xs font-bold text-teal-500 dark:text-blue-500 shadow-xs">
              02
            </div>
            <h5 className="text-xs font-bold text-foreground">
              2. Architecture Evolution
            </h5>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Scaling relational schema configurations, modular layouts, and
              automated state systems.
            </p>
          </div>
          <div className="bg-background relative z-10 text-center space-y-3 p-4">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center mx-auto text-xs font-bold text-emerald-500 dark:text-blue-500 shadow-xs">
              03
            </div>
            <h5 className="text-xs font-bold text-foreground">
              3. Strategic Vision Alignment
            </h5>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Long-term advisory consulting regarding orchestration,
              microservices, and product delivery bounds.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TRUST & VERIFICATION ARCHITECTURE */}
      <section className="bg-muted/30 border border-border/40 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-blue-500/10 border border-teal-500/20 dark:border-blue-500/20 flex items-center justify-center text-teal-500 dark:text-blue-500">
            <SearchCode className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-foreground tracking-tight">
            Our Strict Multi-Step Vetting Loop
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            We protect the integrity of our instruction layer by enforcing
            strict verification requirements before accounts match query
            indexes.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-background/80 p-5 rounded-xl border border-border/40 space-y-1">
            <span className="text-[10px] font-mono text-emerald-500 dark:text-blue-500 font-bold">
              STAGE_01
            </span>
            <h4 className="text-xs font-bold text-foreground">
              Repository & Code Quality Reviews
            </h4>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Active git history profiling to evaluate structural design
              patterns and refactoring standards.
            </p>
          </div>
          <div className="bg-background/80 p-5 rounded-xl border border-border/40 space-y-1">
            <span className="text-[10px] font-mono text-teal-500 dark:text-blue-500 font-bold">
              STAGE_02
            </span>
            <h4 className="text-xs font-bold text-foreground">
              Communication Logic Audits
            </h4>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Live screening to guarantee technical abstract complex models can
              be translated into simple layout actions.
            </p>
          </div>
        </div>
      </section>

      {/* 7. THE ECOSYSTEM IMPACT METRICS */}
      <section className="w-full bg-muted/50 border border-border/60 rounded-2xl p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              50+
            </div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-500 dark:text-blue-500 font-bold">
              Verified Mentors
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              2k+
            </div>
            <div className="text-[10px] uppercase tracking-wider text-teal-500 dark:text-blue-500 font-bold">
              Review Hours Logged
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              90.8%
            </div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-500 dark:text-blue-500 font-bold">
              Pipeline Success Rate
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
              &lt; 15m
            </div>
            <div className="text-[10px] uppercase tracking-wider text-teal-500 dark:text-blue-500 font-bold">
              Average Match Latency
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMMITMENT TO OPEN SOURCE */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20 flex items-center justify-center text-emerald-500 dark:text-blue-500 mx-auto">
          <GitBranch className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-foreground tracking-tight">
          Supporting the Global Developer Community
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl mx-auto">
          Skill Bridge is built on open engineering standards. We allocate a
          fixed share of platform resources to fund open-source maintainers,
          sponsor public developer boilerplates, and build automated CLI
          scaffolding tools to accelerate full-stack programming globally.
        </p>
      </section>
    </main>
  );
}
