"use server"

import { createClient } from "../../../../utils/supabase/server"
import { AuthorFormState, authorSchema } from "../../../../validation/authorSchema";

//fetch specific author
export async function fetchAuthors(id:string){
    const supabase = createClient()
    
  const { data, error } = await (await supabase).from("authors").select().eq('id',id)

    if (error) {
    console.error(error, " error in the author list page");
    return null;
    }

    return data;
}

//update author
export async function updateAuthor(state: AuthorFormState, formData: FormData) {
  // Validate form fields

  const validatedFields = authorSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    middleName: formData.get('middleName'),
    id:formData.get('id')
  })
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  //prepare for insertion into the new database
  const {firstName, lastName, middleName,id} = validatedFields.data
  console.log(firstName, lastName,middleName, id)

  // Insert the new author into the database
  const supabase = await createClient();
  const {data, error} = await supabase.from('authors').update({firstName, lastName,middleName}).eq('id',id)
 
  if(data){
    console.log(data,"data in the actions.ts")
  }

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

//delete author 
export async function handleDeleteAuthor(id: string){
    const supabase = createClient();

    const { error } = await (await supabase).from('authors').delete().eq('id', id).select()


    if(error){
        console.log(error,"error in the action.ts delete author")       
        return {success: false, message:error.message}
    }

    return {success: true, message: "Author deleted succesfully"}  
}