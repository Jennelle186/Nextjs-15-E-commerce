import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import BookListComponent from "./bookListComponent";
import { Book } from "./bookComponent";

const Books = async () => {
  const supabase = await createClient();

  //check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //if user is not logged in, redirect to login page
  if (!user) {
    return redirect("/login");
  }

  //retrieve all of the books from the database
  const { data, error } = await supabase
    .from("books")
    .select("*, authors(firstName, lastName, middleName)");

  //if there is an error, log the error and display an error message
  if (error) {
    console.error(error, " error in the author list page");
    return <div>Error retrieving authors</div>;
  }

  const books: Book[] = data.map((book) => ({
    isbn: book.isbn,
    length: book.length,
    width: book.width,
    height: book.height,
    publisher: book.publisher,
    publicationDate: book.publicationDate,
    pages: book.pages,
    genre: book.genre,
    authorId: book.author_id,
    signed: book.signed,
    format: book.format,
    edition: book.edition,
    productLanguage: book.productLanguage,
    bookImageUrl: book.bookImageUrl,
    stocks: book.stocks,
    title: book.title,
    price: book.price,
    authors: {
      firstName: book.authors.firstName,
      lastName: book.authors.lastName,
      middleName: book.authors.middleName,
    },
  }));

  return <BookListComponent books={books} />;
};

export default Books;
