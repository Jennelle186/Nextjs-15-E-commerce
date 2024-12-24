import DashboardCard from "@/components/Dashboard/dashboardCard";
import { Newspaper } from "lucide-react";
import DashboardLayout from "./dashboardLayout";

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
        <h2 className="text-xl font-bold mb-4">Additional Content</h2>
        {/* Add children components for different pages here */}
      </div>
    </DashboardLayout>
  );
};

export default dashboard;
