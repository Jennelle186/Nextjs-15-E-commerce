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
import { MailIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

//z object for the username and password
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(8, { message: "Minimum 8 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "At least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "At least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "At least one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "At least one special character",
    }),
});

export function LoginForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "You have succesfully logged in. Redirecting...",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error submitting the form.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
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

        <Button type="submit">Submit</Button>

        <div className="flex justify-center">
          <Link href="#" className="text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button variant="outline" className="w-full">
          <MailIcon />
          Login with Gmail
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
