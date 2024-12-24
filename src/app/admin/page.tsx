import DashboardCard from "@/components/Dashboard/dashboardCard";
import { Newspaper } from "lucide-react";
import DashboardLayout from "./dashboardLayout";
import OrderTable from "./orders/orderTable";

const dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between gap-2 mb-2 p-2">
        <DashboardCard title="Orders" value={100} icon={<Newspaper />} />
        <DashboardCard title="Users" value={100} icon={<Newspaper />} />
        <DashboardCard title="Orders" value={100} icon={<Newspaper />} />
        <DashboardCard title="Orders" value={100} icon={<Newspaper />} />
      </div>
      {/* Add more content below the dashboard cards */}
      <div>
        {/* Add children components for different pages here */}
        {/* Tables for orders */}
        <OrderTable title=" Latest Orders" />
      </div>
    </DashboardLayout>
  );
};

export default dashboard;
