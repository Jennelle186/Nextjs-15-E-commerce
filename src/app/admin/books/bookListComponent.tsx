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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const BookListComponent: FC<BookListComponentProps> = ({ books }) => {
  const renderExpandedContent = (book: Book) => {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Book Image */}
            <div className="flex justify-center items-start">
              <div className="relative group">
                {book.bookImageUrl ? (
                  <div className="relative w-full max-w-[220px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl">
                    <Image
                      unoptimized
                      width={220}
                      height={330}
                      src={book.bookImageUrl || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-[220px] aspect-[2/3] flex items-center justify-center bg-muted text-muted-foreground border border-dashed border-border rounded-lg">
                    No Image Available
                  </div>
                )}
                {book.signed && (
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    Signed
                  </Badge>
                )}
              </div>
            </div>

            {/* Book Description and Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {book.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary flex items-center">
                    <span className="inline-block w-1 h-4 bg-primary mr-2 rounded-full"></span>
                    Publication Details
                  </h3>
                  <dl className="grid grid-cols-2 gap-y-3 text-sm">
                    <dt className="font-medium text-muted-foreground">
                      Publisher:
                    </dt>
                    <dd className="font-semibold">{book.publisher}</dd>
                    <dt className="font-medium text-muted-foreground">
                      Publication Date:
                    </dt>
                    <dd className="font-semibold">
                      {new Date(book.publicationDate).toLocaleDateString()}
                    </dd>
                    <dt className="font-medium text-muted-foreground">
                      Pages:
                    </dt>
                    <dd className="font-semibold">{book.pages}</dd>
                    <dt className="font-medium text-muted-foreground">
                      Language:
                    </dt>
                    <dd className="font-semibold">{book.productLanguage}</dd>
                  </dl>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary flex items-center">
                    <span className="inline-block w-1 h-4 bg-primary mr-2 rounded-full"></span>
                    Book Details
                  </h3>
                  <dl className="grid grid-cols-2 gap-y-3 text-sm">
                    <dt className="font-medium text-muted-foreground">
                      Format:
                    </dt>
                    <dd className="font-semibold">{book.format}</dd>
                    <dt className="font-medium text-muted-foreground">
                      Edition:
                    </dt>
                    <dd className="font-semibold">{book.edition}</dd>
                    <dt className="font-medium text-muted-foreground">
                      Signed:
                    </dt>
                    <dd className="font-semibold">
                      {book.signed ? "Yes" : "No"}
                    </dd>
                    <dt className="font-medium text-muted-foreground">
                      Dimensions:
                    </dt>
                    <dd className="font-semibold">
                      {book.length} × {book.width} × {book.height} cm
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Collection</h1>
          <p className="text-muted-foreground mt-1">
            Manage and browse your book inventory
          </p>
        </div>
        <Link href="/admin/books/new">
          <Button size="sm" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </Link>
      </div>
      <div className="bg-card rounded-xl shadow-sm border">
        <DataTable
          columns={columns}
          data={books}
          renderExpandedContent={renderExpandedContent}
        />
      </div>
    </div>
  );
};

export default BookListComponent;
