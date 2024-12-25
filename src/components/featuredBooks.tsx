import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "$12.99",
    badge: "Classic",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: "$14.99",
    badge: "Bestseller",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: "$11.99",
    badge: "Dystopian",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: "$10.99",
    badge: "Romance",
  },
];

export default function FeaturedBooks() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Featured Books
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => (
            <Card
              key={book.id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <Image
                className="w-full"
                src={`/placeholder.svg?height=400&width=300&text=${encodeURIComponent(
                  book.title
                )}`}
                alt={book.title}
                width={300}
                height={400}
              />
              <CardContent className="px-6 py-4">
                <span className="mb-2">{book.badge}</span>
                <div className="font-bold text-xl mb-2">{book.title}</div>
                <p className="text-gray-700 text-base">{book.author}</p>
              </CardContent>
              <CardFooter className="px-6 py-4">
                <span className="text-gray-900 font-bold text-xl">
                  {book.price}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
