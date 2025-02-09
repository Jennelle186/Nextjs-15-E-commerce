"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { FC } from "react";
import { Book, BookListComponentProps } from "./bookComponent";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BookListComponent: FC<BookListComponentProps> = ({ books }) => {
  const renderExpandedContent = (book: Book) => {
    const formattedDate = new Date(book.publicationDate).toLocaleDateString();

    return (
      <Card className="p-6 space-y-4 bg-white shadow-md rounded-2xl">
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: book.description }} />
          </p>
          <Separator className="my-4" />
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Publication Details
              </h3>
              <dl className="grid grid-cols-2 gap-y-2 text-sm mt-2">
                <dt className="font-semibold">Publisher:</dt>
                <dd>{book.publisher}</dd>
                <dt className="font-semibold">Publication Date:</dt>
                <dd>{formattedDate}</dd>
                <dt className="font-semibold">Pages:</dt>
                <dd>{book.pages}</dd>
                <dt className="font-semibold">Language:</dt>
                <dd>{book.productLanguage}</dd>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Book Details
              </h3>
              <dl className="grid grid-cols-2 gap-y-2 text-sm mt-2">
                <dt className="font-semibold">Format:</dt>
                <dd>{book.format}</dd>
                <dt className="font-semibold">Edition:</dt>
                <dd>{book.edition}</dd>
                <dt className="font-semibold">Signed:</dt>
                <dd>{book.signed ? "Yes" : "No"}</dd>
                <dt className="font-semibold">Dimensions:</dt>
                <dd>
                  {book.length} x {book.width} x {book.height} cm
                </dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

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
      <DataTable
        columns={columns}
        data={books}
        renderExpandedContent={renderExpandedContent}
      />
    </div>
  );
};

export default BookListComponent;
