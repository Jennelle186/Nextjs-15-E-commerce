"use server"

import { revalidatePath } from "next/cache";
import { createClient } from "../../../../utils/supabase/server";
import { OrderStatus } from "@/components/orderUIComponent";

//fetch all orders
export async function fetchAllOrders(){
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('orders')
    .select(`*`).order('created_at', { ascending: false });

    if(error){
        console.log("Error fetching orders:", error)
    }

    return data || []
}

//fetch specific order
export async function fetchByOrderID(id: string){
    const supabase = createClient()

    const {data, error} = await (await supabase).from('orders')
        .select(`*,order_items(*, books(title,bookImageUrl,genre,authors(*)))`)
        .eq('order_id', id)

        if(error){
            console.log(error, "error fetching order by order id")
        }

        return data
}


//update order status according to what was clicked by the user 
export async function updateOrderStatus(order_id: string, status: OrderStatus) {
    const supabase = await createClient();
  
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_id", order_id)
      .select();
  
    if (error) {
      console.error(`Error setting the status to ${status}`, order_id);
    }
  
    revalidatePath("/admin/orders");
  }
  
