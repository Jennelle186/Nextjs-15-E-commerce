import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Dashboard/appSideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <SidebarTrigger />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
