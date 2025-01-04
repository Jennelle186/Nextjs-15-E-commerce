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
    publicationDate: Date; // Use string to represent the date
    pages: number;
    genre: string; // You can also use a Genre interface if you have one
    authorId:string; // Reference the Author interface
    signed: boolean;
    format: string;
    edition: string;
    productLanguage: string;
  }