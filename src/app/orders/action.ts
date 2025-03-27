"use server"

import { createClient } from "../../../utils/supabase/server";

//fetch all books orders
export async function fetchAllOrders(){
  const supabase = await createClient();


 // Get authenticated user
 const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("User not authenticated");
    return { success: false, message: "Unauthorized" };
  }

  const userId = user.id;   // Find orders for the user


  const { data, error } = await supabase
  .from('orders')
  .select(`
    *,
    order_items (
      *,
      books (
        title,
        bookImageUrl,
        description,
        authors (
        *)
      )
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

if (error) {
  console.error('Error fetching orders:', error);
} else {
  console.log('User Orders:', data);
}
 return data || [];

}