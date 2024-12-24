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

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Please enter a name",
  }),
  productDescription: z.string().min(2, {
    message: "Please enter a description",
  }),
  price: z.number().int({
    message: "Please enter a valid number",
  }),
  categoryID: z.string().min(2, {
    message: "Please pick a category",
  }),
  stock: z.number().int({
    message: "Please enter a valid number",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FieldConfig {
  name: keyof FormSchema;
  label: string;
  placeholder: string;
}

const fieldConfigs: FieldConfig[] = [
  {
    name: "productName",
    label: "Product Name",
    placeholder: "Enter the product name",
  },
  {
    name: "productDescription",
    label: "Description",
    placeholder: "Enter the description of the product",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter the price",
  },
  {
    name: "categoryID",
    label: "Category",
    placeholder: "Select a category",
  },
  {
    name: "stock",
    label: "Stock",
    placeholder: "Enter stock quantity",
  },
];

const ProductComponent = () => {
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
  function onSubmit(values: FormSchema) {
    // Convert price and stock to numbers
    values.price = Number(values.price);
    values.stock = Number(values.stock);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <FormLabel>{fieldConfig.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          fieldConfig.name === "price" ||
                            fieldConfig.name === "stock"
                            ? Number(value)
                            : value
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductComponent;
