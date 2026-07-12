"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Initial check
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-500 ease-out ${isVisible
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 translate-y-10 pointer-events-none"
        }`}
    >
      <button
        onClick={scrollToTop}
        className="group p-2.5 flex items-center justify-center rounded-lg bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-gray-300 dark:border-gray-800/80 shadow-lg shadow-black/5 dark:shadow-black/20 text-emerald-500 dark:text-blue-500 hover:text-emerald-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 hover:scale-105 transition-all duration-300 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 dark:focus-visible:ring-blue-500/20"
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
}
