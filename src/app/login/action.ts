'use server'

import { createClient } from '../../../utils/supabase/server'
import { loginSchema } from './loginSchema';

// export async function login(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
  
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data)

//   if (error) {
//     console.log(error,"error")
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// 

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginUserValidation = loginSchema.safeParse({
    email,
    password,
  });

  if (!loginUserValidation.success) {
    return {
      error: true,
      message:
        loginUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  // supabase authentication from here
  const supabase = createClient();

  const { data, error } = await (await supabase).auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  if (!data.user) {
    return {
      error: true,
      message: "Login failed. Please try again.",
    };
  }
  

  // User successfully logged in
  return {
    success: true,
    message: "Login successful",
    user: {
      id: data.user.id,
      email: data.user.email,
      // Add any other user data you want to return
    },
    
  };
};