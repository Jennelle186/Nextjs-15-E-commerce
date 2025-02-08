"use client";

import {
  BookInferSchema,
  BookSchema,
} from "../../../../../validation/bookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Author } from "../../../../../types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookGenres, formats } from "./bookMaps";
import { Switch } from "@/components/ui/switch";
import { startTransition, useActionState, useEffect } from "react";
import { addBook } from "../action";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/Editor/RichTextEditor";

interface BookFormProps {
  authors: Author[];
}

const BookForm: React.FC<BookFormProps> = ({ authors }) => {
  const [state, action, pending] = useActionState(addBook, undefined);

  // React Hook Form with default values
  const form = useForm<BookInferSchema>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      ISBN: "",
      length: 0,
      width: 0,
      height: 0,
      publisher: "",
      publicationDate: new Date(), // Defaults to today’s date
      pages: 0,
      genre: "",
      authorId: "",
      signed: false,
      format: "Paperback",
      edition: "1st",
      productLanguage: "English",
      stocks: 0,
      title: "",
      price: 0,
      description: "",
    },
  });

  //submitting the forms
  async function onSubmit(data: BookInferSchema) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          value instanceof Date ? value.toISOString() : value.toString()
        );
      });

      //sending the formData to the action.ts for submitting the forms
      const response = (await action(formData)) as {
        error?: string;
        message?: string;
      } | void;

      //Error or success messages for any submissions and any errors/success from the server
      if (response?.error) {
        toast({
          title: "Error",
          description: `An error occurred: ${response.error}`,
        });
      } else {
        form.reset();
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occured.",
      });
    }
  }

  //Error or success messages for any submissions and any errors/success from the server
  useEffect(() => {
    if (state?.message) {
      toast({
        title: state?.error ? "Error" : "Success",
        description: state?.message,
      });
    }
  }, [state]);

  return (
    <div className="container mx-auto p-4">
      {/* Testing */}
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            startTransition(() => {
              form.handleSubmit(onSubmit)(e);
            });
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Row 1: Basic details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="ISBN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ISBN</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ISBN" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the 10 or 13 digit ISBN.
                          {state?.errors?.ISBN && <p>{state.errors.ISBN}</p>}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publisher</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter publisher" {...field} />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.publisher && (
                          <FormDescription>
                            {state.errors.publisher}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publicationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.publicationDate && (
                          <FormDescription>
                            {state.errors.publicationDate}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Pages</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.pages && (
                          <FormDescription>
                            {state.errors.pages}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 2: Book Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book title" {...field} />
                      </FormControl>
                      <FormMessage />
                      {state?.errors?.title && (
                        <FormDescription>{state.errors.title}</FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                {/* Row 3: Dimensions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.length && (
                          <FormDescription>
                            {state.errors.length}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 4: Genre, Author, Format & Edition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bookGenres.map((genre) => (
                              <SelectItem
                                key={genre.value}
                                value={genre.value.toString()}
                              >
                                {genre.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author.id} value={author.id}>
                                {author.firstName}{" "}
                                {author.middleName && `${author.middleName} `}
                                {author.lastName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Format</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {formats.map((format) => (
                              <SelectItem
                                key={format.value}
                                value={format.value}
                              >
                                {format.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="edition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edition</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter edition" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 5: Language & Signed */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="productLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Language</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product language"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="signed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Signed Book</FormLabel>
                          <FormDescription>
                            Is the book signed or not?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 6: Stocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="stocks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stocks</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.stocks && (
                          <FormDescription>
                            {state.errors.stocks}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                              ₱
                            </span>
                            <Input
                              type="number"
                              step="1"
                              className="pl-7" // add padding so text doesn't overlap the prefix
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                        {state?.errors?.price && (
                          <FormDescription>
                            {state.errors.price}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Book Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <RichTextEditor onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                      {state?.errors?.description && (
                        <FormDescription>
                          {state.errors.description}
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-6">
            {/* Submit Button */}
            <Button disabled={pending} type="submit" size="lg">
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
