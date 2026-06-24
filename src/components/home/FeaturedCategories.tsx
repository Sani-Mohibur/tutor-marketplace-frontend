import React from "react";

interface CategoryCard {
  title: string;
  description: string;
  slug: string;
  icon: string;
}

const POPULAR_CATEGORIES: CategoryCard[] = [
  {
    title: "Frontend Development",
    description:
      "Master interactive interfaces with React, Next.js, and modern CSS.",
    slug: "frontend",
    icon: "💻",
  },
  {
    title: "Backend Engineering",
    description:
      "Build scalable APIs, server systems, and robust database models.",
    slug: "backend",
    icon: "⚙️",
  },
  {
    title: "Real-Time Systems",
    description:
      "Explore instant communication via WebSockets, sockets, and streaming architectures.",
    slug: "real-time",
    icon: "⚡",
  },
  {
    title: "System Design",
    description:
      "Learn scalable architecture patterns, load balancing, and performance tuning.",
    slug: "system-design",
    icon: "🏗️",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full py-20 border-b border-card-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Most Trending Subjects
          </h2>
          <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed">
            Discover the most popular topics you want to learn, explore
            specialized skills, and find the perfect mentor to help you succeed.
          </p>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_CATEGORIES.map((category) => (
            <div
              key={category.slug}
              className="group p-6 rounded-2xl border border-card-border bg-card hover:border-brand-accent/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-brand-accent/5 dark:hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent Bar: Emerald in Light, Blue/Cyan in Dark */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent dark:bg-gradient-to-r dark:from-blue-500 dark:to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="text-3xl mb-4 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-block">
                {category.icon}
              </div>
              <h3 className="text-base font-bold text-foreground transition-colors tracking-tight">
                {category.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-medium">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
