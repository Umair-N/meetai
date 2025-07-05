"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return <>loading.....</>;
  }
  return <Button>Start</Button>;
}
