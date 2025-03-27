"use server"

import { revalidatePath } from "next/cache"
import { checkoutFormSchema, FormState } from "../../../types/check-out"
import { z } from "zod";
import { createClient } from "../../../utils/supabase/server";

//type-safe cart schema
const cartItemSchema = z.object({
  isbn: z.string(),
  quantity: z.number(),
  price: z.number(),
});

const cartSchema = z.array(cartItemSchema);


export async function processCheckout(prevState: FormState | null, formData: FormData) {
  // Extract form data as an object
  const rawFormData = Object.fromEntries(formData.entries())

  const parsedData = {
    ...rawFormData,
  }

  // Validate form fields
  const validationResult = checkoutFormSchema.safeParse(parsedData)

  // If form validation fails, return errors
  if (!validationResult.success) {
    const errors: Record<string, string[]> = {}

    validationResult.error.issues.forEach((issue) => {
      const path = issue.path.join(".")
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(issue.message)
    })

    return {
      errors,
      message: "Please correct the errors in the form.",
    }
  }

  //create a supabase instance
  const supabase = createClient();

  try {
    // Get the validated data
    const data = validationResult.data

    // Log the data to verify userID is included
    console.log("Checkout data with userID:", data.id)
    console.log(data,"validationResult data")

    //Parse cart
    const cartString = rawFormData.cart as string | undefined;
    const cartItems = cartString ? JSON.parse(cartString) : [];

    const parsedCart = cartSchema.safeParse(cartItems);
    if (!parsedCart.success) {
      return { message: "Invalid cart data." };
    }

    console.log("Validated Cart Items:", parsedCart.data);

    //total price of the entire cart items
  const totalPrice: number = parsedCart.data.reduce(
    (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
    0
  );


    // Insert the order into the database
    const { data: orderData, error } = await (await supabase).from("orders").insert([
      {
        user_id: data.id,
        delivery_options: data.deliveryOption,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        street: data.street,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        country: data.country,
        notes: data.notes || null,
        status: "processing",
        total: totalPrice
      },
    ]).select("order_id").single();

    if(error|| !orderData){
      console.error("Order error:", error)
      return {message: "An error occurred while processing your order. Please try again."}
    }

    const orderId = orderData.order_id;


    //inserting cart items
    const orderItemsPayload = parsedCart.data.map((item) => ({
      order_id: orderId,
      isbn: item.isbn,
      quantity: item.quantity,
      price: item.price,
    }));


    //add all of the cart items to the order_items table
    const { error: orderItemsError } = await (await supabase).from("order_items").insert(orderItemsPayload);
    if (orderItemsError) {
      console.error("Order items insert error:", orderItemsError);
      return { message: "Failed to add items to your order." };
    }

    // Step 3: Decrease stock levels
    //used an rpc function for this instead of updating the stock levels directly
    const { error: stockUpdateError } = await (await supabase).rpc("decrease_book_stocks", {
      order_items: parsedCart.data,
    });
    
    console.log(error, "stocks update error")
    if (stockUpdateError) {
      console.error("Stock update RPC failed:", stockUpdateError);
      return {
        message: "Failed to update stock levels. Please try again.",
      };
    }
    
    // Revalidate path for the checkout page
    revalidatePath("/checkout")

    return {
      success: true,
      message: "Order placed successfully!",
    }
  } catch (error) {
    console.error("Checkout error:", error)
    return {
      message: "An error occurred while processing your order. Please try again.",
    }
  }
}

