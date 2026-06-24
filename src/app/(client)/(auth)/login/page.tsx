import LoginForm from "@/components/auth/LoginForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
      <main className="flex-grow w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Subtle premium background ambient accent blue glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <LoginForm />
      </main>
    </div>
  );
}
