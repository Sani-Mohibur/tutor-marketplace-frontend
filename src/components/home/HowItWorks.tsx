"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Star,
  ChevronRight
} from "lucide-react";

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Choose Your Tutor",
      subtitle: "Find Your Perfect Match",
      description: "Browse our curated network of verified professionals to find the ideal match for your learning goals.",
      features: ["Elite Instructors", "Real-Time Availability", "Verified Credentials"],
      gradient: "from-emerald-400 to-emerald-500 dark:from-blue-400 dark:to-blue-500",
      bgGradient: "from-emerald-50 to-emerald-100 dark:from-blue-950/30 dark:to-blue-900/30",
      renderIllustration: () => (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          {/* Search Bar */}
          <motion.div
            className="w-full max-w-[160px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm flex items-center p-2.5 px-3 gap-2 z-10"
            animate={hoveredStep === 0 ? { y: -10, scale: 1.02 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Search className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-400" />
            <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-600 rounded-full" />
          </motion.div>

          {/* Search Results */}
          <motion.div
            className="absolute w-full max-w-[140px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-2.5 flex flex-col gap-2.5 mt-12"
            animate={hoveredStep === 0 ? { opacity: 1, y: 15 } : { opacity: 0, y: 25 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-blue-900/50" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-12 bg-slate-200 dark:bg-slate-600 rounded-full" />
                <div className="h-1 w-8 bg-slate-100 dark:bg-slate-700 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-cyan-900/50" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-10 bg-slate-200 dark:bg-slate-600 rounded-full" />
                <div className="h-1 w-14 bg-slate-100 dark:bg-slate-700 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      step: 2,
      icon: MessageCircle,
      title: "Connect & Schedule",
      subtitle: "Personalize Your Path",
      description: "Message your tutor to discuss your goals and coordinate the perfect time for your first session.",
      features: ["Direct Messaging", "Goal Alignment", "Flexible Scheduling"],
      gradient: "from-teal-400 to-teal-500 dark:from-cyan-400 dark:to-cyan-500",
      bgGradient: "from-teal-50 to-teal-100 dark:from-cyan-950/30 dark:to-cyan-900/30",
      renderIllustration: () => (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          {/* Top Chat Bubble */}
          <motion.div
            className="w-4/5 self-end bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tr-sm p-3 shadow-sm flex items-center gap-3 mb-2.5"
            animate={hoveredStep === 1 ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <div className="flex-1">
              <div className="h-2 w-20 bg-slate-200 dark:bg-slate-600 rounded" />
              <div className="h-1.5 w-28 bg-slate-200 dark:bg-slate-600 rounded mt-1.5" />
            </div>
          </motion.div>

          {/* Bottom Chat Bubble */}
          <motion.div
            className="w-4/5 self-start bg-gradient-to-br from-teal-50 to-teal-100 dark:from-cyan-950/30 dark:to-cyan-900/30 border border-teal-200 dark:border-cyan-800/50 rounded-2xl rounded-tl-sm p-3 shadow-sm flex items-center gap-3"
            animate={hoveredStep === 1 ? { y: 8, scale: 1.02 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 dark:from-cyan-400 dark:to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              SM
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 bg-teal-400 dark:bg-cyan-400 rounded-full" />
                <motion.div
                  className="flex gap-1"
                  animate={hoveredStep === 1 ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-1.5 h-1.5 bg-teal-500 dark:bg-cyan-500 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-teal-500 dark:bg-cyan-500 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-teal-500 dark:bg-cyan-500 rounded-full" />
                </motion.div>
              </div>
              <div className="h-1.5 w-16 bg-teal-400/50 dark:bg-cyan-400/50 rounded-full mt-1.5" />
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      step: 3,
      icon: Calendar,
      title: "Book Your Session",
      subtitle: "Start Learning",
      description: "Confirm your booking securely and embark on your tailored learning experience.",
      features: ["Instant Booking", "Secure Payments", "Satisfaction Guarantee"],
      gradient: "from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-sky-500",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-blue-950/30 dark:to-sky-950/30",
      renderIllustration: () => (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Calendar Base */}
          <motion.div
            className="w-28 h-28 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow flex flex-col p-2.5"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-2.5 w-12 bg-slate-200 dark:bg-slate-600 rounded" />
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((day) => (
                <div
                  key={day}
                  className={`rounded-lg text-[8px] flex items-center justify-center ${day === 5 ? 'bg-gradient-to-br from-emerald-400 to-teal-400 dark:from-blue-400 dark:to-sky-400 text-white font-bold' :
                    day === 3 ? 'bg-emerald-100 dark:bg-blue-900/30' : ''
                    }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Selection Indicator */}
          <motion.div
            className="absolute w-9 h-9 border-2 border-emerald-400 dark:border-blue-400 rounded-xl bg-emerald-50 dark:bg-blue-900 flex items-center justify-center"
            animate={hoveredStep === 2 ? {
              opacity: 1,
              scale: 1,
              x: 20,
              y: -20
            } : {
              opacity: 0,
              scale: 0.5,
              x: 0,
              y: 0
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-blue-400" />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full py-28 bg-slate-50 dark:bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            How to Find Your Perfect Tutor
          </h2>
          <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-0">
            Connect with our elite network of expert instructors and begin your personalized learning journey today. Master new skills and achieve your goals in just three simple, hassle-free steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div className="relative h-full rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/50 p-8 shadow-sm transition-all overflow-hidden">
                {/* Step Number Background */}
                <div className="absolute -top-6 -right-6 text-8xl font-black text-slate-100 dark:text-slate-800/50 select-none">
                  {String(item.step).padStart(2, '0')}
                </div>

                <div className="flex flex-col h-full items-center text-center relative z-10">
                  {/* Illustration Box */}
                  <div className={`relative w-full h-48 mb-8 bg-gradient-to-br ${item.bgGradient} rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50`}>
                    {item.renderIllustration()}

                    {/* Step Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Step {item.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4`}>
                    <item.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-400 dark:to-cyan-400 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-muted-foreground leading-relaxed font-medium mb-5">
                    {item.description}
                  </p>

                  {/* Features */}
                  <div className="w-full space-y-2 mt-auto">
                    {item.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-blue-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}