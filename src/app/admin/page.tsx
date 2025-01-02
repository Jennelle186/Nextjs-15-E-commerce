import DashboardCard from "@/components/Dashboard/dashboardCard";
import { Newspaper } from "lucide-react";
import OrderTable from "./orders/orderTable";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-2 p-2">
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
    </div>
  );
};

export default dashboard;
