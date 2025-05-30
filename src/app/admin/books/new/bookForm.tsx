"use client";

import { useActionState, useEffect } from "react";
import { addBook } from "../action";
import { useForm } from "react-hook-form";
import {
  BookInferSchema,
  BookSchema,
} from "../../../../../validation/bookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
// import RichTextEditor from "@/components/Editor/RichTextEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookGenres, formats } from "./bookMaps";
import { Select } from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";
import { Author } from "../../../../../types/product";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface BookFormProps {
  authors: Author[];
}

const BookForm: React.FC<BookFormProps> = ({ authors }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(addBook, undefined);

  // React Hook Form with default values
  const form = useForm<BookInferSchema>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      isbn: "",
      length: 0,
      width: 0,
      height: 0,
      publisher: "",
      publicationDate: new Date(), // Defaults to today’s date
      pages: 0,
      genre: "",
      author_id: "",
      signed: false,
      format: "Paperback",
      edition: "1st",
      productLanguage: "English",
      stocks: 0,
      title: "",
      price: 0,
      description: "",
      bookImageUrl: "",
    },
  });

  useEffect(() => {
    if (!state) return; // Ensures no unnecessary re-renders

    if (state.message) {
      toast({
        title: state.error ? "Error" : "Success",
        description: state.message,
      });
    }

    if (state.id) {
      router.push(`/admin/books/${state.id}/edit`);
    }
  }, [state, router]); // Only `state` is needed in dependencies

  return (
    <div className="container mx-auto p-4">
      {/* Testing */}
      <Form {...form}>
        <form action={action}>
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
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ISBN</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ISBN" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the 10 or 13 digit ISBN.
                        </FormDescription>
                        {state?.errors?.isbn && (
                          <FormMessage>{state.errors.isbn}</FormMessage>
                        )}
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
                        {state?.errors?.publisher && (
                          <FormMessage>{state.errors.publisher}</FormMessage>
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
                              field.value instanceof Date &&
                              !isNaN(field.value.getTime())
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const dateValue = e.target.value
                                ? new Date(e.target.value)
                                : null;
                              field.onChange(dateValue);
                            }}
                          />
                        </FormControl>
                        {state?.errors?.publicationDate && (
                          <FormMessage>
                            {state.errors.publicationDate}
                          </FormMessage>
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
                          <FormMessage>{state.errors.pages}</FormMessage>
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
                        <FormMessage>{state.errors.title}</FormMessage>
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
                          <FormMessage>{state.errors.length}</FormMessage>
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
                        {state?.errors?.width && (
                          <FormMessage>{state.errors.width}</FormMessage>
                        )}
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
                        {state?.errors?.height && (
                          <FormMessage>{state.errors.height}</FormMessage>
                        )}
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
                        {state?.errors?.genre && (
                          <FormMessage>{state.errors.genre}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Select
                          onValueChange={field.onChange || ""}
                          defaultValue={field.value}
                          name={`author_id`}
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
                        {state?.errors?.author_id && (
                          <FormMessage>{state.errors.author_id}</FormMessage>
                        )}
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
                          onValueChange={field.onChange || " "}
                          defaultValue={field.value}
                          name="format"
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
                        {state?.errors?.format && (
                          <FormMessage>{state.errors.format}</FormMessage>
                        )}
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
                        {state?.errors?.edition && (
                          <FormMessage>{state.errors.edition}</FormMessage>
                        )}{" "}
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
                        {state?.errors?.productLanguage && (
                          <FormMessage>
                            {state.errors.productLanguage}
                          </FormMessage>
                        )}
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
                        {state?.errors?.signed && (
                          <FormMessage>{state.errors.signed}</FormMessage>
                        )}
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
                          <FormMessage>{state.errors.stocks}</FormMessage>
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
                          <FormMessage>{state.errors.price}</FormMessage>
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
                        {/* <RichTextEditor
                          content={field.value}
                          onChange={(value) => field.onChange(value)}
                        /> */}
                        <Textarea
                          placeholder="Enter the description of the book"
                          className="resize-none"
                          {...field}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "0px";
                            target.style.height = target.scrollHeight + "px";
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {state?.errors?.description && (
                        <FormMessage>{state.errors.description}</FormMessage>
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
