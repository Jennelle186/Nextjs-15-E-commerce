"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/orders/dataColumnHeader";
import { format } from "date-fns";
import { getStatusBadge, OrderStatus } from "@/components/orderUIComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  MoreHorizontal,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "./orderTypes";
import { updateOrderStatus } from "./action";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order #" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("order_id")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    header: "Customer",
    cell: ({ row }) => {
      const {
        firstName,
        lastName,
        street,
        city,
        province,
        postalCode,
        country,
      } = row.original;
      return (
        <div>
          <div className="font-medium">
            {firstName} {lastName}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
            {street} {city} {province} {postalCode} {country}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "delivery_options",
    header: "Delivery Option",
    cell: ({ row }) => {
      const deliveryOption = row.getValue("delivery_options") as string;

      // Format the value
      const formattedOption =
        deliveryOption.toLowerCase() === "cod"
          ? "COD (Cash-on-Delivery)"
          : deliveryOption
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters

      return <span>{formattedOption}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date;
      return <div>{format(date, "MMM d, yyyy")}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;
      return getStatusBadge(status);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" asChild>
            <Link href={`/admin/orders/${order.order_id}`}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/admin/orders/${order.order_id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => updateOrderStatus(order.order_id, "processing")}
                disabled={order.status === "processing"}
              >
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                Mark as Processing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateOrderStatus(order.order_id, "shipped")}
                disabled={order.status === "shipped"}
              >
                <Truck className="h-4 w-4 mr-2 text-amber-500" />
                Mark as Shipped
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateOrderStatus(order.order_id, "delivered")}
                disabled={order.status === "delivered"}
              >
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Mark as Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateOrderStatus(order.order_id, "cancelled")}
                disabled={order.status === "cancelled"}
              >
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Mark as Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
