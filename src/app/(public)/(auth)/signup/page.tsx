import { AuthTransitionWrapper } from "@/features/auth/components/auth-transition-wrapper";
import SignupCard from "@/features/auth/components/signup-form";
import React from "react";

export default function Signup() {
  return (
    <AuthTransitionWrapper>
      <SignupCard />
    </AuthTransitionWrapper>
  );
}
