import { z } from "zod";

export const BookSchema = z.object({
  isbn: z.string().min(10, "ISBN must be at least 10 characters").max(13, "ISBN must not exceed 13 characters"),
  length: z.number().positive("Length must be a positive number"),
  width: z.number().positive("Width must be a positive number"),
  height: z.number().positive("Height must be a positive number"),
  publisher: z.string().min(1, "Publisher is required"),
  publicationDate: z.date({
    required_error: "Please select a data",
    invalid_type_error: "That is not a date."
  }),
  pages: z.number().int().positive("Pages must be a positive integer"),
  genre: z.string().min(1, "Genre is required"),
  author_id: z.string(), // Reference the Author schema
  signed: z.boolean(),
  format: z.string().min(1, "Format is required"),
  edition: z.string().min(1, "Edition is required"),
  productLanguage: z.string().min(1, "Product language is required"),
  stocks: z.number().int().positive("Stocks must be a positive integer"),
  title: z.string().min(1, "Title is required"),
  price: z.number().int().positive("Price must be a positive number"),
  description: z.string().min(1, "Description about the book is required"),
  bookImageUrl: z.string().optional(),
});

// TypeScript Type for Book
export type BookInferSchema = z.infer<typeof BookSchema>;

//Form state for adding and editing books
export type BookFormState =
  | {
      errors?: {
        isbn?: string[];
        length?: string[];
        width?: string[];
        height?: string[];
        publisher?: string[];
        publicationDate?: string[];
        pages?: string[];
        genre?: string[];
        author_id?: string[];
        signed?: string[];
        format?: string[];
        edition?: string[];
        productLanguage?: string[];
        stocks?: string[];
        title?: string[];
        price?: string[];
        description?:string[];
        bookImageUrl?: string[];
      };
      message?: string;
    }
  | undefined;
