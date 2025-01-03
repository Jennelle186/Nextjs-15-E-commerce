"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Author } from "../../../../types/product";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  MoreHorizontal,
  SquarePen,
  Trash2Icon,
} from "lucide-react";

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
import { handleDeleteAuthor } from "./action";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },

  {
    header: "Middle Name",
    accessorKey: "middleName",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const author = row.original;

      //delete function
      const handleDelete = async (id: string) => {
        console.log(id, "id in the handle Delete");
        if (id) {
          try {
            //implementing the handleDeleteAuthor from the action.ts
            const response = await handleDeleteAuthor(id);
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
            <Link href={`/admin/author/${author.id}/edit`}>
              <DropdownMenuItem>
                <SquarePen className="text-green-" /> Edit author
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
                    the information of the author{" "}
                    {author.firstName + " " + author.lastName}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(author.id)}>
                    Yes, delete author
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
