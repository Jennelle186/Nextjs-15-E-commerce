import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon: React.ReactElement<LucideIcon>;
  value: number;
}

const DashboardCard = ({ title, icon, value }: DashboardCardProps) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-4 m-2 w-full md:w-1/4">
      <CardContent>
        <h3 className="text-2xl text-center mb-1 font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-1 justify-center items-center">
          {icon}
          <h3 className="text-4xl font-semibold text-slate-500 dark:text-slate-200">
            {value}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
