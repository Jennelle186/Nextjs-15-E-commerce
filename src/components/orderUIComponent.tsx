import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

// Define order status types
export type OrderStatus =
  | "processing"
  | "ready for pick up"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "picked-up";

// Get status badge color
export const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "processing":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-600 border-blue-200"
        >
          Processing
        </Badge>
      );
    case "shipped":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-600 border-amber-200"
        >
          Shipped
        </Badge>
      );
    case "delivered":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-600 border-green-200"
        >
          Delivered
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-600 border-red-200"
        >
          Cancelled
        </Badge>
      );
    case "ready for pick up":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-600 border-yellow-200"
        >
          Ready for Pick Up
        </Badge>
      );
    case "picked-up":
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-600 border-purple-200"
        >
          Picked-up
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Get status icon
export const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "processing":
      return <Clock className="h-5 w-5 text-blue-500" />;
    case "ready for pick up":
      return <PackageCheck className="h-5 2-5 text-yellow-400" />;
    case "shipped":
      return <Truck className="h-5 w-5 text-amber-500" />;
    case "delivered":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "cancelled":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "picked-up":
      return <ShoppingBag className="h-5 w-5 text-purple-500" />;
    default:
      return <Package className="h-5 w-5" />;
  }
};

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
