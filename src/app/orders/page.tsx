import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import { fetchAllOrders } from "./action";
import OrderHistoryComponent from "./orderHistoryComponent";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Order History | Book Store",
  description: "View your order history and track your purchases",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fetchedOrders = await fetchAllOrders();
  const orders = Array.isArray(fetchedOrders) ? fetchedOrders : [];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300 ml-2",
                pacifico.className
              )}
            >
              Orders
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your order history and view details of your past purchases.
          </p>
        </div>

        <OrderHistoryComponent orders={orders} />
      </div>
    </div>
  );
}
