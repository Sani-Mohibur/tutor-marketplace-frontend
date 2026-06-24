import { ReactNode } from "react";
import { headers } from "next/headers";
import { ROLES } from "@/constants/roles";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

interface ProfileLayoutProps {
  student: ReactNode;
  tutor: ReactNode;
}

export default async function ProfileLayout(props: ProfileLayoutProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data) {
    redirect("/login");
  }

  const userRole = session.data?.user?.role;

  if (userRole === ROLES.TUTOR) {
    return <>{props.tutor}</>;
  }

  return <>{props.student}</>;
}
