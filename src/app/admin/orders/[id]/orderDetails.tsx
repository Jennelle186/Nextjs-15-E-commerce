"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStatusBadge, OrderStatus } from "@/components/orderUIComponent";
import { useToast } from "@/hooks/use-toast";
import { Order } from "../orderTypes";
import LoadingSkeleton from "@/components/loadingState";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  StickyNote,
  Truck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { updateOrderStatus } from "../action";

type OrderDetailsComponentProps = {
  orders: Order;
};
const OrderDetailsComponent = ({ orders }: OrderDetailsComponentProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [order, setOrder] = useState(orders);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | undefined>(
    undefined
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!order) {
      toast({
        title: "Error",
        description: "Order not found.",
        variant: "destructive",
      });
      router.push("/admin/orders");
      return;
    }

    setCurrentStatus((order?.status as OrderStatus) ?? "");
    setIsLoading(false);
  }, [order, router, toast]);

  // Update order status
  const updateOrderStatusFunction = async () => {
    if (!order || !currentStatus || currentStatus === order.status) return;

    setIsUpdating(true);

    // Simulate API call
    await updateOrderStatus(order.order_id, currentStatus);

    setOrder((prev) => ({
      ...prev,
      status: currentStatus as OrderStatus,
    }));

    toast({
      title: "Order Status Updated",
      description: `Order ${order.order_id} status changed to ${currentStatus}.`,
    });

    setIsUpdating(false);
  };

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  // Order not found
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The order you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button onClick={() => router.push("/admin/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/orders")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Order #{order.order_id}
            </h1>
            <p className="text-muted-foreground">
              Placed on {format(order.created_at, "MMMM d, yyyy")}
            </p>
          </div>
        </div>
      </div>

      {/* Order Status and Actions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <CardTitle>Order Status</CardTitle>
              {getStatusBadge(order.status as OrderStatus)}
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={currentStatus}
                onValueChange={(value) =>
                  setCurrentStatus(value as OrderStatus)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  {order.delivery_options.toLowerCase() === "pickup" ? (
                    <>
                      <SelectItem value="ready for pick up">
                        Ready for Pick Up
                      </SelectItem>
                      <SelectItem value="picked-up">Picked Up</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </>
                  )}
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={updateOrderStatusFunction}
                disabled={
                  isUpdating || !currentStatus || currentStatus === order.status
                }
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              {order.status === "processing" && (
                <Clock className="h-5 w-5 text-blue-500" />
              )}
              {order.status === "ready for pick up" && (
                <Package className="h-5 w-5 text-yellow-500" />
              )}
              {order.status === "picked-up" && (
                <CheckCircle2 className="h-5 w-5 text-purple-500" />
              )}
              {order.status === "shipped" && (
                <Truck className="h-5 w-5 text-amber-500" />
              )}
              {order.status === "delivered" && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              {order.status === "cancelled" && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <h3 className="font-medium">
                  {order.status === "processing" && "Order is being processed"}
                  {order.status === "ready for pick up" && "Ready for Pick Up"}
                  {order.status === "picked-up" && "Order was picked up"}
                  {order.status === "shipped" && "Order has been shipped"}
                  {order.status === "delivered" && "Order has been delivered"}
                  {order.status === "cancelled" && "Order has been cancelled"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {order.status === "processing" &&
                    "The order is being prepared."}
                  {order.status === "ready for pick up" &&
                    "The order is ready and awaiting pickup."}
                  {order.status === "picked-up" &&
                    "The customer has picked up the order."}
                  {order.status === "shipped" &&
                    "The package is on its way to the customer."}
                  {order.status === "delivered" &&
                    "The order was delivered successfully."}
                  {order.status === "cancelled" &&
                    "This order has been cancelled."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="customer">Customer Info</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Order Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>items in this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-muted/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {order.order_items.map((item) => (
                      <tr
                        key={item.order_items_id}
                        className="hover:bg-muted/20"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-12 flex-shrink-0">
                              <Image
                                unoptimized
                                src={
                                  item.books?.bookImageUrl || "/placeholder.svg"
                                }
                                alt={item.books?.title || "Book image"}
                                className="object-cover rounded w-full h-full"
                                width={48}
                                height={64}
                                priority={false}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.books?.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.books?.authors.firstName}{" "}
                                {item.books?.authors.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.books?.genre}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          ₱{" "}
                          {item.price.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium">
                          ₱{" "}
                          {(item.quantity * item.price).toLocaleString(
                            "en-PH",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  <span className="text-muted-foreground">Method:</span>{" "}
                  {order.delivery_options.toLowerCase() === "cod" ? (
                    <span className="font-medium">COD (Cash-On-Delivery)</span>
                  ) : (
                    <span className="font-medium">
                      {order.delivery_options.charAt(0).toUpperCase() +
                        order.delivery_options.slice(1)}
                    </span>
                  )}
                </p>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>
                      ₱{" "}
                      {order.total.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>{order.street}</p>
                  <p>
                    {order.city}, {order.province}, {order.country}
                  </p>
                  <p>{order.postalCode}</p>
                  <p>{order.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Info Tab */}
        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Contact Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {order.firstName} {order.middleName} {order.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {order.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {order.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Customer Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {order.notes ? (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <StickyNote className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-amber-700 dark:text-amber-300">
                        {order.notes}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No customer notes for this order.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderDetailsComponent;
