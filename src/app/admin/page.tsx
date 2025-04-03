import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminStatsCards } from "@/components/Admin/admin-stat-cards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./orders/columns";
import { fetchAllOrders } from "./orders/action";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const dashboard = async () => {
  const supabasePromise = createClient();
  const supabase = await supabasePromise;
  // Fetch the user's profile based on their user ID

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    // Use the user's ID to fetch their profile

    .single();
  // We expect only one profile

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    redirect("/login");
    // Redirect if there's an error fetching the profile
  }
  // Check if the user is an admin

  if (profileData && profileData?.role === 2) {
    // User is an admin, proceed to load the page

    console.log("User is an admin:", profileData);
  } else {
    // User is not an admin, redirect or show an error

    console.error("User is not an admin");
    redirect("/");
    // Redirect to homepage
  }

  const ordersResponse = await fetchAllOrders();
  const orders = Array.isArray(ordersResponse) ? ordersResponse : [];

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/orders">
                View All Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        {/* Stats Cards */}
        <AdminStatsCards />

        <Card className="space-y-4">
          <CardHeader className="text-xl font-semibold">All Orders</CardHeader>
          <CardContent>
            <DataTable columns={columns} data={orders} />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default dashboard;
