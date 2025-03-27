"use server"

import { createClient } from "../../../utils/supabase/server";

//fetch all books
export async function fetchAllBooks(){
  const supabase = await createClient();

  const { data, error } = await supabase
  .from("books")
  .select("*, authors(firstName, lastName, middleName)");

  if(error){
    return null;
  }

  return data
}

//add to cart
