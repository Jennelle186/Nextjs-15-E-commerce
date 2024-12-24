import {
  BaggageClaim,
  FlipVertical,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: FlipVertical,
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: FlipVertical,
  },
  {
    title: "Orders",
    url: "#",
    icon: BaggageClaim,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Users",
    url: "#",
    icon: UserRound,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="w-64 bg-gray-800 text-black h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold p-4 pb-2">
            Admin Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center p-2 text-lg"
                    >
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
