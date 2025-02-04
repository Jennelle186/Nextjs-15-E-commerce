// types.ts (or in the same file if you prefer)
export type Book = {
    isbn: string;
    length: number;
    width: number;
    height: number;
    publisher: string;
    publicationDate: string;
    pages: number;
    genre: string;
    authorId: string;
    signed: boolean;
    format: string;
    edition: string;
    productLanguage: string;
    bookImageUrl: string | null;
    stocks: number;
    title: string;
    price: number;
    authors: {
      firstName: string;
      lastName: string;
      middleName?: string;
    };
  };

  
  export type BookListComponentProps = {
    books: Book[];
  };
  