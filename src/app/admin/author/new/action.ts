"use server"

import { createClient } from "../../../../../utils/supabase/server"
import { AuthorFormState, authorSchema } from "../../../../../validation/authorSchema"

export async function addAuthor(state: AuthorFormState, formData: FormData) {
  // Validate form fields
  console.log(formData.get('firstName')," formData")

  const validatedFields = authorSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    middleName: formData.get('middleName'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  //prepare for insertion into the new database
  const {firstName, lastName, middleName} = validatedFields.data

  // Insert the new author into the database
  const supabase = createClient();
  const { error } = await (await supabase).from('authors').insert({
    firstName,lastName,middleName,
    created_at: new Date().toISOString(),
  });
  
  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Profile updated successfully',
  };

}