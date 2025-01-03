export interface Author {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
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