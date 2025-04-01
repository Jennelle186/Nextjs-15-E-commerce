import { redirect } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import { fetchByOrderID } from "../action";
import OrderDetailsComponent from "./orderDetails";
import { Order } from "../orderTypes";

const OrderDetails = async (props: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const params = await props.params;
  const id = params.id;

  const result = await fetchByOrderID(id);

  if (!result || !Array.isArray(result) || result.length === 0) {
    throw new Error("Order not found");
  }

  const order: Order = result[0]; // Adjust this based on the actual structure of your data

  return <OrderDetailsComponent orders={order} />;
};

export default OrderDetails;
