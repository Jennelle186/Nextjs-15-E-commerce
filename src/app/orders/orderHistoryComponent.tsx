"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  Package,
  Search,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  containerVariants,
  getStatusBadge,
  getStatusIcon,
  itemVariants,
  OrderStatus,
} from "../../components/orderUIComponent";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { OrderList } from "../../../types/orders";
import { format } from "date-fns";
import { useMediaQuery } from "./use-media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type OrderHistoryComponentProps = {
  orders: OrderList;
};

const OrderHistoryComponent = ({ orders }: OrderHistoryComponentProps) => {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<OrderList[number] | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  //filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_items.some((item) =>
        item.books?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter orders based on active tab
  const tabFilteredOrders =
    activeTab === "all"
      ? filteredOrders
      : filteredOrders.filter((order) => order.status === activeTab);

  // View order details
  const viewOrderDetails = (order: OrderList[number]) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Empty state
  if (orders.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven&#39;t placed any orders yet.
            </p>
            <Button onClick={() => router.push("/")}>Start Shopping</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Tab options for dropdown on mobile
  const tabOptions = [
    { value: "all", label: "All" },
    { value: "processing", label: "Processing" },
    { value: "ready for pick up", label: "Ready for Pick Up" },
    { value: "picked-up", label: "Picked Up" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Filter and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setActiveTab(value); // <- sync tab with status filter
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="ready for pick up">Ready for Pick Up</SelectItem>
            <SelectItem value="picked-up">Picked Up</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Dropdown for Tabs */}
        {isMobile ? (
          <div className="mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {tabOptions.find((tab) => tab.value === activeTab)?.label ||
                    "All"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                {tabOptions.map((tab) => (
                  <DropdownMenuItem
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={cn(activeTab === tab.value && "bg-muted")}
                  >
                    {tab.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          // Tablet and Desktop Tabs
          <div className="relative mb-6">
            <ScrollArea className="w-full">
              <TabsList
                className={cn(
                  "inline-flex w-full",
                  isDesktop ? "grid-cols-7" : "w-max"
                )}
              >
                {tabOptions.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "px-4 py-2 whitespace-nowrap",
                      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-300 data-[state=active]:to-rose-300 data-[state=active]:text-white"
                    )}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
          </div>
        )}

        {/* Tabe Content */}
        <TabsContent value={activeTab}>
          {tabFilteredOrders.length === 0 ? (
            <Card className="text-center py-8">
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `No orders matching "${searchQuery}"`
                      : `No ${
                          activeTab !== "all" ? activeTab : ""
                        } orders found`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {tabFilteredOrders.map((order) => (
                <motion.div key={order.order_id} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/30 py-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status as OrderStatus)}
                            <span className="font-medium">
                              Order ID: {order.order_id}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(order.created_at, "MMM d, yyyy")}
                            </span>
                          </div>
                          {order.notes && (
                            <div className="flex items-center gap-1 text-sm text-amber-600">
                              <StickyNote className="h-4 w-4" />
                              <span>Has notes</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(order.status as OrderStatus)}
                          <span className="font-medium">
                            ₱{" "}
                            {order.total.toLocaleString("en-PH", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Content of the card */}
                    <CardContent className="py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Items
                          </h4>
                          <div className="space-y-2">
                            {order.order_items.map((item) => (
                              <div
                                key={item.isbn}
                                className="flex items-center gap-3"
                              >
                                <div className="h-12 w-10 flex-shrink-0">
                                  <Image
                                    unoptimized
                                    src={
                                      item.books?.bookImageUrl || "book image"
                                    }
                                    alt={
                                      item.books?.title ||
                                      "Book title unavailable"
                                    }
                                    className="object-cover rounded w-full h-full"
                                    width={40}
                                    height={48}
                                    priority={false}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {item.books?.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity}, Price: ₱{" "}
                                    {item.price.toLocaleString("en-PH", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Shipping Address
                          </h4>
                          <div className="text-sm">
                            <p className="font-medium">{order.firstName}</p>
                            <p>{order.street}</p>
                            <p>
                              {order.city}, {order.province}, {order.postalCode}
                            </p>
                            <p>{order.country}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 py-3 flex justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Payment Method:{" "}
                        </span>
                        <span className="font-medium">
                          {order.delivery_options.toLowerCase() === "cod" ? (
                            <span className="font-medium">
                              COD (Cash-On-Delivery)
                            </span>
                          ) : (
                            <span className="font-medium">
                              {order.delivery_options.charAt(0).toUpperCase() +
                                order.delivery_options.slice(1)}
                            </span>
                          )}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => viewOrderDetails(order)}
                      >
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Order details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Order #{selectedOrder.order_id}</span>
                  {getStatusBadge(selectedOrder.status as OrderStatus)}
                </DialogTitle>
                <DialogDescription>
                  Placed on: {format(selectedOrder.created_at, "MMMM d, yyyy")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 my-4">
                {/* Order Status */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(selectedOrder.status as OrderStatus)}
                    <div>
                      <h3 className="font-medium">
                        {selectedOrder.status === "processing" &&
                          "Your order is being processed"}
                        {selectedOrder.status === "ready for pick up" &&
                          "Your order is ready for pick up"}
                        {selectedOrder.status === "picked-up" &&
                          "You picked up this order"}
                        {selectedOrder.status === "shipped" &&
                          "Your order has been shipped"}
                        {selectedOrder.status === "delivered" &&
                          "Your order has been delivered"}
                        {selectedOrder.status === "cancelled" &&
                          "Your order has been cancelled"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.status === "processing" &&
                          "We're preparing your items for shipment"}
                        {selectedOrder.status === "ready for pick up" &&
                          "You can now pick up your order at our location"}
                        {selectedOrder.status === "picked-up" &&
                          "You have successfully picked up your order"}
                        {selectedOrder.status === "shipped" &&
                          "Your package is on its way to you"}
                        {selectedOrder.status === "delivered" &&
                          "Your order was delivered successfully"}
                        {selectedOrder.status === "cancelled" &&
                          "This order has been cancelled"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes Section - only displayed when there are notes */}
                {selectedOrder.notes && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <StickyNote className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-amber-800 dark:text-amber-400">
                          Order Notes
                        </h3>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          {selectedOrder.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.order_items.map((item) => (
                      <div key={item.isbn} className="flex gap-4 border-b pb-4">
                        <div className="h-20 w-16 flex-shrink-0">
                          <Image
                            unoptimized
                            src={item.books?.bookImageUrl || "/placeholder.svg"}
                            alt={item.books?.title || "Book title unavailable"}
                            className="object-cover rounded w-full h-full"
                            width={64}
                            height={80}
                            priority={false}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.books?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.books?.authors.firstName}{" "}
                            {item.books?.authors.lastName}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium">
                              ₱{" "}
                              {(
                                item.quantity * Number(item.price)
                              ).toLocaleString("en-PH", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Shipping Information
                    </h3>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-medium">
                        {selectedOrder.firstName} {selectedOrder.middleName}{" "}
                        {selectedOrder.lastName}
                      </p>
                      <p>{selectedOrder.street}</p>
                      <p>
                        {selectedOrder.city}, {selectedOrder.province},{" "}
                        {selectedOrder.postalCode}
                      </p>
                      <p>{selectedOrder.country}</p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Payment Information
                    </h3>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p>
                        <span className="text-muted-foreground">Method:</span>{" "}
                        {selectedOrder.delivery_options}
                      </p>
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>
                            ₱{" "}
                            {selectedOrder.total.toLocaleString("en-PH", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="sm:mr-auto"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Orders
                </Button>
                {selectedOrder.status !== "cancelled" && (
                  <Button
                    className="bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
                    onClick={() => router.push("/books")}
                  >
                    Buy Again
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderHistoryComponent;
