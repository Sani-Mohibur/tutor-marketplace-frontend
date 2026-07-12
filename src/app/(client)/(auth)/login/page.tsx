import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex flex-col lg:flex-row min-h-screen w-full items-center justify-center lg:justify-end overflow-hidden py-12 lg:py-0">
      {/* Full-screen Background Image */}
      <Image
        src="/login-hero.jpg"
        alt="SkillBridge Background"
        fill
        priority
        className="object-cover"
      />

      {/* Premium Overlay */}
      <div className="absolute inset-0">
        {/* Smooth Left → Right Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/15 via-slate-950/40 to-slate-950/85" />

        {/* Soft Blue Ambient Glow */}
        <div className="absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Subtle Global Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.25)_100%)]" />
      </div>

      {/* Content Layout */}
      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Left Column */}
        <div className="hidden xl:block" />

        {/* Middle Column - Branding */}
        <div className="flex flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg">
            Learn. <br />
            Teach. <br />
            Grow Together.
          </h1>

          <p className="text-lg text-white/90 max-w-md leading-relaxed font-medium drop-shadow-md">
            Connect with expert tutors and unlock personalized learning experiences from anywhere in the world.
          </p>
        </div>

        {/* Right Column - Login Form */}
        <div className="flex items-center justify-center px-4 sm:px-8 lg:px-12 py-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}