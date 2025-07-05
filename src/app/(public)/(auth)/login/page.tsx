import { AuthTransitionWrapper } from "@/features/auth/components/auth-transition-wrapper";
import LoginCard from "@/features/auth/components/login-form";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!!session) {
    return redirect("/");
  }
  return (
    <AuthTransitionWrapper>
      <LoginCard />
    </AuthTransitionWrapper>
  );
}
