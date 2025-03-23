"use server"

import { revalidatePath } from "next/cache";
import { createClient } from "../../../../utils/supabase/server";
import { BookFormState, BookSchema } from "../../../../validation/bookSchema";



//adding a book
export async function addBook(state: BookFormState, formData: FormData) {
  // Validate form fields
  // Log all form data to debug
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const validatedFields = BookSchema.safeParse({
    isbn:formData.get("isbn"),
    length: formData.get("length") ? Number(formData.get("length")) : undefined,
    width: formData.get("width") ? Number(formData.get("width")) : undefined,
    height: formData.get("height") ? Number(formData.get("height")) : undefined,
    publisher: formData.get("publisher"),
    publicationDate: formData.get("publicationDate") 
      ? new Date(formData.get("publicationDate") as string) 
      : undefined,
    pages: formData.get("pages") ? Number(formData.get("pages")) : undefined,
    genre: formData.get("genre"),
    author_id: formData.get("author_id"),
    signed: formData.get("signed") === "true", // Ensure boolean conversion
    format: formData.get("format"),
    edition: formData.get("edition"),
    productLanguage: formData.get("productLanguage"),
    stocks: formData.get("stocks") ? Number(formData.get("stocks")) : undefined,
    title: formData.get("title"),
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    description: formData.get("description"),
  });


   // Check if validation failed
   if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.format()); // Log errors
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

 // Prepare for insertion into the new database
 const {isbn, length, width, height, publisher, publicationDate, pages, genre, author_id, signed, format, edition, productLanguage, stocks, title, price, description} = validatedFields.data

  // Insert the new author into the database
  const supabase = createClient();
  const {data, error} = await (await supabase).from('books').insert({isbn, length, width, height, publisher,publicationDate, pages, genre, author_id, signed, format, edition,  productLanguage, stocks, title, price, description});

  if(data){
    console.log(data,"isbn:", isbn,"data in the addBook function")
  }

  
  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  revalidatePath('/admin/books');
  
  return {
    error: false,
    message: 'Book updated successfully',
    id: isbn,
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

  revalidatePath('/admin/books');

  return {success: true, message: "Book deleted succesfully"}  
}

//edit a book
export async function updateBook(state: BookFormState, formData: FormData) {
  // Validate form fields
  // Log all form data to debug
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`, "pair in the updateBook function");
  }

  const validatedFields = BookSchema.safeParse({
    isbn:formData.get("isbn"),
    length: formData.get("length") ? Number(formData.get("length")) : undefined,
    width: formData.get("width") ? Number(formData.get("width")) : undefined,
    height: formData.get("height") ? Number(formData.get("height")) : undefined,
    publisher: formData.get("publisher"),
    publicationDate: formData.get("publicationDate") 
      ? new Date(formData.get("publicationDate") as string) 
      : undefined,
    pages: formData.get("pages") ? Number(formData.get("pages")) : undefined,
    genre: formData.get("genre"),
    author_id: formData.get("author_id"),
    signed: formData.get("signed") === "true", // Ensure boolean conversion
    format: formData.get("format"),
    edition: formData.get("edition"),
    productLanguage: formData.get("productLanguage"),
    stocks: formData.get("stocks") ? Number(formData.get("stocks")) : undefined,
    title: formData.get("title"),
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    description: formData.get("description"),
    bookImageUrl : formData.get("bookImageUrl")
  });


   // Check if validation failed
   if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.format()); // Log errors
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

 // Prepare for insertion into the new database
 const {isbn, length, width, height, publisher, publicationDate, pages, genre, author_id, signed, format, edition, productLanguage, stocks, title, price, description, bookImageUrl} = validatedFields.data

  // Insert the new author into the database
  const supabase = createClient();
  const {data, error} = await (await supabase).from('books').update({isbn, length, width, height, publisher,publicationDate, pages, genre, author_id, signed, format, edition,  productLanguage, stocks, title, price, description, bookImageUrl}).eq('isbn',isbn);

  if(data){
    console.log(data,"isbn:", isbn,"data in the updateBook function")
  }

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  revalidatePath(`/admin/books/${isbn}/edit`);
  revalidatePath('/admin/books');

  return {
    error: false,
    message: 'Profile updated successfully',
  };


}

