import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ROLES } from "@/constants/roles";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Fetch live server-side session using better-auth headers matrix
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  // Guard check: Redirect unauthenticated requests to login page immediately
  if (!session?.data) {
    redirect("/login");
  }

  const userRole = session.data?.user?.role;

  // Role verification: If not explicitly authorized as admin, redirect to homepage
  if (userRole !== ROLES.ADMIN) {
    redirect("/");
  }

  // Render client UI shell once authentication checks pass safely
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
