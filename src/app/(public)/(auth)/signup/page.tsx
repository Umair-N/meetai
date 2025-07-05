import { AuthTransitionWrapper } from "@/features/auth/components/auth-transition-wrapper";
import SignupCard from "@/features/auth/components/signup-form";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Signup() {
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
      <SignupCard />
    </AuthTransitionWrapper>
  );
}
