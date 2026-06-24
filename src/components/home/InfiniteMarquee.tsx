"use client";

import { useEffect, useRef } from "react";
import { Quote, Star, UserCheck } from "lucide-react";

/* -----------------------------
   STATIC DATA
------------------------------*/
const STATIC_CARDS = [
  {
    id: "m1",
    name: "Sarah Jenkins",
    role: "MERN Stack Learner",
    content:
      "The real-time guidance here completely unlocked system design for me. Exceptional mentors.",
    metric: "4.9/5 Rating",
  },
  {
    id: "m2",
    name: "David Chen",
    role: "Next.js Student",
    content:
      "Incredibly smooth learning interface. Found a top-tier mentor in under five minutes.",
    metric: "120+ Hours",
  },
  {
    id: "m3",
    name: "Elena Rostova",
    role: "Data Science Aspirant",
    content:
      "Every tutor feels like a real industry expert. The quality is consistently high.",
    metric: "Verified Pro",
  },
  {
    id: "m4",
    name: "Marcus Brody",
    role: "Backend Engineer",
    content:
      "Structured sessions significantly improved my system design and problem-solving skills.",
    metric: "1-on-1 Mastery",
  },
  {
    id: "m5",
    name: "Amina Rahman",
    role: "Frontend Developer",
    content:
      "Clean, distraction-free learning experience with truly professional mentors.",
    metric: "Top Tier",
  },
];

const getFloatClass = (idx: number) => {
  if (idx % 3 === 0) return "float-a";
  if (idx % 3 === 1) return "float-b";
  return "float-c";
};

function MarqueeCard({ card, idx }: any) {
  return (
    <div
      className={`
        relative w-[340px] shrink-0 rounded-2xl p-6
        border border-black/5 dark:border-white/10
        bg-gradient-to-b from-slate-50/60 via-slate-50/40 to-transparent
        dark:from-slate-950/60 dark:via-slate-950/40 dark:to-transparent
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
        hover:-translate-y-1
        hover:scale-[1.015]
        hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]
        dark:hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]
        transition-all duration-500 ease-out
        group overflow-hidden select-none
        ${getFloatClass(idx)}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 dark:from-blue-500/5 dark:to-blue-500/5 opacity-80 group-hover:opacity-100 transition" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 dark:via-blue-400/40 to-transparent" />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">{card.name}</h3>
            <p className="text-[11px] text-muted-foreground">{card.role}</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-200/50 dark:bg-white/5 border border-black/5 dark:border-white/10">
            <Quote className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-400 rotate-180" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {card.content}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-blue-400">
            <UserCheck className="w-3 h-3" />
            {card.metric}
          </span>
          <div className="flex gap-0.5 text-amber-500 dark:text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InfiniteMarquee() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // We loop the data 5 times to ensure there is an enormous trail buffer for high speed scrolls
  const rowData = [
    ...STATIC_CARDS,
    ...STATIC_CARDS,
    ...STATIC_CARDS,
    ...STATIC_CARDS,
    ...STATIC_CARDS,
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let speed = 0.65; // Base automatic rolling speed parameter
    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    // 1. Core Continuous Animation & Infinite Reset Vector
    const updateScroll = () => {
      if (!isDragging) {
        container.scrollLeft += speed;

        // Reset to middle seamless loop position once reaching extreme bounds
        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    // 2. Mouse Wheel Interaction Injection with Momentum Fast Scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Directly translate wheel delta directly to scroll mapping without stopping animation
      container.scrollLeft += e.deltaY * 1.2;
    };

    // 3. Click and Drag Support for Desktop Mouse Browsing
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Speed multiplier for dragging
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
      isDragging = false;
    };

    // Attach Event Listeners
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUpOrLeave);
    container.addEventListener("mouseleave", handleMouseUpOrLeave);

    // Run Engine Loop
    animationFrameId = requestAnimationFrame(updateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUpOrLeave);
      container.removeEventListener("mouseleave", handleMouseUpOrLeave);
    };
  }, []);

  return (
    <section className="w-full py-24 bg-background overflow-hidden relative border-b border-black/5 dark:border-white/5">
      {/* Heading Layout */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Engineered For Global Success
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          A premium mentorship experience meticulously engineered to bridge the
          gap between theory and execution, driving real-world career
          acceleration through elite, tactical guidance.
        </p>
      </div>

      {/* Interactive Horizontal Tracking Canvas */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="flex gap-6 py-4 px-4 w-max">
          {rowData.map((card, idx) => (
            <MarqueeCard
              key={"loop-card-" + card.id + idx}
              card={card}
              idx={idx}
            />
          ))}
        </div>
      </div>

      {/* Persistent Fluid CSS Motion Variables */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* floating animations */
        @keyframes float-a {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes float-b {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(5px);
          }
        }
        @keyframes float-c {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .float-a {
          animation: float-a 10s ease-in-out infinite;
        }
        .float-b {
          animation: float-b 12s ease-in-out infinite;
        }
        .float-c {
          animation: float-c 14s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
