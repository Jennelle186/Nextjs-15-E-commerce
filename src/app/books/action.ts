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

// Add book to user's cart
export async function addToCart(bookId: string) {
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

  // Find or create cart for the user
  const { data: existingCart, error: cartFetchError } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", user.id)
    .single();

  let cartId = existingCart?.id;

  if (!cartId) {
    const { data: newCart, error: cartCreateError } = await supabase
      .from("cart")
      .insert({ user_id: user.id })
      .select("id")
      .single();

    if (cartCreateError || !newCart) {
      console.error("Failed to create cart:", cartCreateError);
      return { success: false, message: "Cart creation failed" };
    }

    cartId = newCart.id;
  }

  // Check if the item is already in the cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id")
    .eq("cart_id", cartId)
    .eq("isbn", bookId)
    .single();

  if (existingItem) {
    return { success: false, message: "Book already in cart" };
  }

  // Insert into cart_items
  const { error: itemInsertError } = await supabase.from("cart_items").insert({
    cart_id: cartId,
    isbn: bookId,
    quantity: 1,
  });

  if (itemInsertError) {
    console.error("Failed to add item:", itemInsertError);
    return { success: false, message: "Insert failed" };
  }

  return { success: true, message: "Book added to cart" };
}
