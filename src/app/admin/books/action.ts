"use server"

import { createClient } from "../../../../utils/supabase/server";
import { BookFormState, BookSchema } from "../../../../validation/bookSchema";


export async function addBook(state: BookFormState, formData: FormData) {
  // Validate form fields
  // Log all form data to debug
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const validatedFields = BookSchema.safeParse({
    ISBN: formData.get("ISBN"),
    length: formData.get("length") ? Number(formData.get("length")) : undefined,
    width: formData.get("width") ? Number(formData.get("width")) : undefined,
    height: formData.get("height") ? Number(formData.get("height")) : undefined,
    publisher: formData.get("publisher"),
    publicationDate: formData.get("publicationDate") 
      ? new Date(formData.get("publicationDate") as string) 
      : undefined,
    pages: formData.get("pages") ? Number(formData.get("pages")) : undefined,
    genre: formData.get("genre"),
    authorId: formData.get("authorId"),
    signed: formData.get("signed") === "true", // Ensure boolean conversion
    format: formData.get("format"),
    edition: formData.get("edition"),
    productLanguage: formData.get("productLanguage"),
    stocks: formData.get("stocks") ? Number(formData.get("stocks")) : undefined,
    title: formData.get("title"),
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
  });

   // Check if validation failed
   if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.format()); // Log errors
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

 // Prepare for insertion into the new database
 const {ISBN, length, width, height, publisher, publicationDate, pages, genre, authorId, signed, format, edition, productLanguage, stocks, title, price} = validatedFields.data

  // Insert the new author into the database
  const supabase = createClient();
  const {data, error} = await (await supabase).from('books').insert({isbn: ISBN, length, width, height, publisher,publicationDate, pages, genre, author_id: authorId, signed, format, edition,  productLanguage, stocks, title, price});

  if(data){
    console.log(data,"data in the addBook function")
  }

  
  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Book updated successfully',
  };

}

//fetch all books
export async function fetchAllBooks(id: string){
  const supabase = await createClient();

    //retrieve all of the books from the database
    const { data, error } = await supabase
    .from("books")
    .select("*, authors(firstName, lastName, middleName)").eq('isbn',id);
    
  if(error){
    return null;
  }

  return data
}

//delete book
export async function handleDeleteBook(id: string){
  const supabase = createClient();

  const { error } = await (await supabase).from('books').delete().eq('isbn', id).select()


  if(error){
      console.log(error,"error in the action.ts delete book")       
      return {success: false, message:error.message}
  }

  return {success: true, message: "Book deleted succesfully"}  
}