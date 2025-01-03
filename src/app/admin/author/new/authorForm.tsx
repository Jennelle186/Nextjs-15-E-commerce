"use client";
import { useActionState, useEffect } from "react";
import { addAuthor } from "./action";
import { useForm } from "react-hook-form";
import { authorSchema } from "../../../../../validation/authorSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AuthorForm = () => {
  const [state, action, pending] = useActionState(addAuthor, undefined);

  // 1. Define your form.
  const form = useForm<z.infer<typeof authorSchema>>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state?.error ? "Error" : "Success",
        description: state?.message,
      });
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the author&apos;s first name.
                {state?.errors?.firstName && <p>{state.errors.firstName}</p>}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the author&apos;s last name.
                {state?.errors?.lastName && <p>{state.errors.lastName}</p>}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (Optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the author&apos;s middle name, if any.
                {state?.errors?.middleName && <p>{state.errors.middleName}</p>}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthorForm;
