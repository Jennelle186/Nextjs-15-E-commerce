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
import {
  ArrowUpDown,
  MoreHorizontal,
  SquarePen,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { handleDeleteBook } from "./action";
import { toast } from "@/hooks/use-toast";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "isbn",
    header: "ISBN",
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "authors",
    header: "Author",
    cell: ({ row }) => {
      const authors = row.getValue("authors") as Book["authors"];
      return <div>{`${authors.firstName} ${authors.lastName}`}</div>;
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
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
      const id = book.isbn;

      //delete function
      const handleDelete = async (id: string) => {
        console.log(id, "id in the handle Delete");
        if (id) {
          try {
            //implementing the handleDeleteAuthor from the action.ts
            const response = await handleDeleteBook(id);
            if (response.success) {
              toast({
                title: "Success",
                description: response.message,
              });
              window.location.reload();
            } else {
              toast({
                title: "Error",
                description: response.message,
              });
            }
          } catch (error) {
            console.error("Error deleting author:", error);
            toast({
              title: "Error",
              description: "An unexpected error occurred",
            });
          }
        }
      };

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
            <Link href={`/admin/books/${id}/edit`}>
              <DropdownMenuItem>
                <SquarePen className="text-green-" /> Edit Book
              </DropdownMenuItem>
            </Link>
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
                  <AlertDialogAction onClick={() => handleDelete(id)}>
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
