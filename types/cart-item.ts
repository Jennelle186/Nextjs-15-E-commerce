export type Author = {
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
  };
  
  export type OrderItem = {
    isbn: string;
    length: number;
    width: number;
    height: number;
    publisher: string;
    publicationDate: string; // ISO string
    pages: number;
    genre: string;
    author_id: string | null;
    signed: boolean;
    format: string;
    edition: string;
    productLanguage: string;
    bookImageUrl: string | null;
    stocks: number | null;
    title: string | null;
    price: number | null;
    description: string | null;
    authors: Author;
    quantity: number;
  };
  
  export type OrderSummaryTypes = OrderItem[];
  