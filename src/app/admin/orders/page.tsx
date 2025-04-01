import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import OrderComponent from "./orderComponent";
import { fetchAllOrders } from "./action";

const Order = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const orders = await fetchAllOrders();

  return <OrderComponent orders={orders} />;
};

export default Order;
