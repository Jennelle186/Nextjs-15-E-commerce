"use client";

import {
  BaggageClaim,
  FlipVertical,
  LayoutDashboard,
  Settings,
  UserRound,
  LogOut, // If you have an icon for logout from lucide-react
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
import LogoutButton from "../NavBar/logOutButton";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Authors",
    url: "/admin/author",
    icon: FlipVertical,
  },
  {
    title: "Manage Books",
    url: "/admin/books",
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
  // Add a logout item
  {
    title: "Logout",
    isLogout: true,
    icon: LogOut,
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
                    {item.isLogout ? (
                      // If the item is a logout item, render the LogoutButton
                      <div className="flex items-center p-2 text-lg">
                        <LogoutButton />
                      </div>
                    ) : (
                      <Link
                        href={item.url || "#"}
                        className="flex items-center p-2 text-lg"
                      >
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    )}
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
