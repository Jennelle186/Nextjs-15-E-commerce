"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "./orderTypes";

type OrderComponentProps = {
  orders: Order[];
};

const OrderComponent = ({ orders }: OrderComponentProps) => {
  console.log(orders, "orders");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedOrders, setFetchedOrders] = useState<Order[]>([]);

  // Simulate data fetching
  useEffect(() => {
    setIsLoading(true);

    // Simulate a delay for fetching orders (e.g., API call)
    const fetchOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2-second delay
      setFetchedOrders(orders); // Set the fetched orders
      setIsLoading(false); // Set loading to false
    };

    fetchOrders();
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading orders..."
              : `${fetchedOrders.length} orders found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <>
              {" "}
              <DataTable columns={columns} data={fetchedOrders} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderComponent;
