"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { registerUser } from "./action";
import { passwordMatchSchema } from "../../../validation/passwordMatchSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleSignIn from "../login/google";

//z object for the username and password
const formSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export function SignUpComponent({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: `${response.message}`,
        });
      } else {
        // Redirect to the confirmation page
        router.push("/sign-up/confirmation");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: `${(error as Error).message}`,
      });
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login-pic.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
          priority
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShoppingBag className="size-4" />
            </div>
            BookHaven
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={cn("flex flex-col gap-6", className)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Sign Up</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to create an account
                  </p>
                </div>

                {/* Email */}
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>

                <div className="flex justify-center">
                  <Link
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <GoogleSignIn />

                <div className="text-center text-sm">
                  Already have an account?
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </form>
            </Form>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
