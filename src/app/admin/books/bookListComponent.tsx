import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { FC } from "react";
import { BookListComponentProps } from "./bookComponent";

const BookListComponent: FC<BookListComponentProps> = ({ books }) => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">List of Books</h1>
        <Link href="/admin/books/new">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={books} />
    </div>
  );
};

export default BookListComponent;
