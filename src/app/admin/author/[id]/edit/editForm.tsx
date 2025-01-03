"use client";

import BackButton from "@/components/backButton";
import { Author } from "../../../../../../types/product";
import { updateAuthor } from "../../action";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authorSchema } from "../../../../../../validation/authorSchema";
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

interface EditAuthorFormProps {
  author: Author | null;
}

type AuthorFormValues = z.infer<typeof authorSchema>;

const EditAuthorForm: React.FC<EditAuthorFormProps> = ({ author }) => {
  const [state, action, pending] = useActionState(updateAuthor, undefined);

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      id: author?.id,
      firstName: author?.firstName ?? "",
      middleName: author?.middleName ?? "",
      lastName: author?.lastName ?? "",
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
    <div>
      <BackButton text="Go Back" link="/admin/author" />
      Edit Author Form
      <Form {...form}>
        <form action={action} className="space-y-8">
          <input type="hidden" {...form.register("id")} />
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
                  {state?.errors?.middleName && (
                    <p>{state.errors.middleName}</p>
                  )}
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
    </div>
  );
};

export default EditAuthorForm;
