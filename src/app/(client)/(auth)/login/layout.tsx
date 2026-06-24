import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ROLES } from "@/constants/roles";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default async function LoginLayout({ children }: LoginLayoutProps) {
  // Fetch live server-side session
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  // Guard check: Route based on role if already authenticated
  if (session?.data) {
    const userRole = session.data.user?.role;

    if (userRole === ROLES.ADMIN) {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }

  // Render the login UI shell for unauthenticated users
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background/50">
      {children}
    </div>
  );
}
