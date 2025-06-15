import { AuthTransitionWrapper } from "@/features/auth/components/auth-transition-wrapper";
import LoginCard from "@/features/auth/components/login-form";

export default function Login() {
  return (
    <AuthTransitionWrapper>
      <LoginCard />
    </AuthTransitionWrapper>
  );
}
