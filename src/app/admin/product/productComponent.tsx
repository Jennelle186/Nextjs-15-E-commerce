"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Please enter a name",
  }),
  productDescription: z.string().min(2, {
    message: "Please enter a description",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  categoryID: z.string().min(2, {
    message: "Please pick a category",
  }),
  stock: z.coerce.number({
    required_error: "Stocks are required",
    invalid_type_error: "Stocks must be a number",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FieldConfig {
  name: keyof FormSchema;
  label: string;
  placeholder: string;
  type: string;
}

const fieldConfigs: FieldConfig[] = [
  {
    name: "productName",
    label: "Product Name",
    placeholder: "Enter the product name",
    type: "text",
  },
  {
    name: "productDescription",
    label: "Description",
    placeholder: "Enter the description of the product",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter the price",
    type: "number",
  },
  {
    name: "categoryID",
    label: "Category",
    placeholder: "Select a category",
    type: "text",
  },
  {
    name: "stock",
    label: "Stock",
    placeholder: "Enter stock quantity",
    type: "number",
  },
];

const ProductComponent = () => {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      price: 0,
      categoryID: "",
      stock: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormSchema) {
    try {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);

      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Product has been submitted successfully.",
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fieldConfigs.map((fieldConfig) => (
            <FormField
              key={fieldConfig.name}
              control={form.control}
              name={fieldConfig.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    {fieldConfig.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      type={fieldConfig.type}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductComponent;
