"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signupInputSchema } from "../api/signup";

export default function SignupCard() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof signupInputSchema>>({
    resolver: zodResolver(signupInputSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signupInputSchema>) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (error) => {
          setPending(false);
          setError(error.error.message);
        },
      }
    );
  };

  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      { provider, callbackURL: "/" },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: (error) => {
          setPending(false);
          setError(error.error.message);
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-radial from-blue-700 to-blue-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <Image src="/logo.svg" alt="Login" width={92} height={92} />
            <p className="text-white font-bold text-2xl">Meet.AI</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 w-full"
            >
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                  <p className="text-muted-foreground text-balance text-sm">
                    Create a new account
                  </p>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="m@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon
                        className="!text-destructive"
                        size={20}
                      />
                      <AlertTitle className="text-destructive ">
                        {error}
                      </AlertTitle>
                    </Alert>
                  )}

                  <Button className="w-full" type="submit" disabled={pending}>
                    Sign Up
                  </Button>

                  <div className="relative text-sm text-center">
                    <div className="absolute inset-0 top-1/2 border-t border-border"></div>
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full cursor-pointer"
                      onClick={() => onSocial("github")}
                    >
                      <Image
                        src="/github.svg"
                        alt="Github"
                        width={20}
                        height={20}
                      />
                      Github
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full cursor-pointer"
                      onClick={() => onSocial("google")}
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={20}
                        height={20}
                      />
                      Google
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center text-muted-foreground text-xs *:[a]:hover:text-primary text-balance">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
