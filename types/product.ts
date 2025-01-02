export interface Author {
    id: string;
    last_name: string;
    first_name: string;
    middle_name: string;
  }

  export interface Book {
    ISBN: string;
    length: number;
    width: number;
    height: number;
    publisher: string;
    publicationDate: string; // Use string to represent the date
    pages: number;
    genre: string; // You can also use a Genre interface if you have one
    author: Author; // Reference the Author interface
    signed: boolean;
    format: string;
    dCoded: boolean;
    edition: string;
    productLanguage: string;
  }