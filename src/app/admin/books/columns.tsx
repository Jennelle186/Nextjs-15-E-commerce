"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Book } from "./bookComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePen, Trash2Icon } from "lucide-react";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    // For the authors field, we can combine first, middle, and last name.
    accessorKey: "authors",
    header: "Author",
    cell: ({ row }) => {
      const author = row.original.authors;
      // Check if middleName exists and adjust the string accordingly
      const fullName = author.middleName
        ? `${author.firstName} ${author.middleName} ${author.lastName}`
        : `${author.firstName} ${author.lastName}`;
      return <div>{fullName}</div>;
    },
  },
  {
    accessorKey: "length",
    header: "Length (cm)",
  },
  {
    accessorKey: "width",
    header: "Width (cm)",
  },
  {
    accessorKey: "height",
    header: "Height (cm)",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "publicationDate",
    header: "Publication Date",
    cell: ({ row }) => {
      // Convert the string from the API into a Date object
      const rawDate = row.getValue("publicationDate");
      const date = new Date(rawDate as string);
      // Format the date into a more readable format (adjust locale/options as needed)
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "pages",
    header: "Pages",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "signed",
    header: "Signed",
    cell: ({ row }) => <div>{row.getValue("signed") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "format",
    header: "Format",
  },
  {
    accessorKey: "edition",
    header: "Edition",
  },
  {
    accessorKey: "productLanguage",
    header: "Language",
  },
  {
    accessorKey: "stocks",
    header: "Stocks",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <Link href={`/admin/author/${author.id}/edit`}> */}
            <DropdownMenuItem>
              <SquarePen className="text-green-" /> Edit book
            </DropdownMenuItem>
            {/* </Link> */}
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger>
                <p className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                  <Trash2Icon className="text-red-500" />
                  Delete
                </p>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the information of the book {book.title}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                  // onClick={() => handleDelete(author.id)}
                  >
                    Yes, delete book
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
