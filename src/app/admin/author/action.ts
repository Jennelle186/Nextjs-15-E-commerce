"use server"

import { createClient } from "../../../../utils/supabase/server"

export async function handleDeleteAuthor(id: string){
    const supabase = createClient();

    const { error } = await (await supabase).from('authors').delete().eq('id', id).select()


    if(error){
        console.log(error,"error in the action.ts delete author")       
        return {success: false, message:error.message}
    }

    return {success: true, message: "Author deleted succesfully"}
    

}