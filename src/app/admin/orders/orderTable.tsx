import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface OrdersTableProps {
  title?: string;
}

const OrderTable = ({ title }: OrdersTableProps) => {
  //   // Sort orders in descending order based on createdAt date
  //   const sortedOrders: Order[] = [...orders].sort(
  //     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   );

  //   // Filter orders to limit
  //   const filteredOrders = limit ? sortedOrders.slice(0, limit) : sortedOrders;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? title : "Orders"}
      </h3>
      <Table>
        <TableCaption>A list of your recent orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">OrderID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Adress</TableHead>
            <TableHead className="text-right">Items</TableHead>
            <TableHead className="text-right">Total Order(s) Amount</TableHead>
            <TableHead className="text-right">Order Status</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">Pending</TableCell>
            <TableCell className="text-right">
              {/* PUT A DOLLAR SIGN FOR THE ORDER.ID NEXT TIME---SAMPLE */}
              <Link href={`/admin/`} passHref>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
