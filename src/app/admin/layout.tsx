import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/Admin/admin-sdebar";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Admin Dashboard | Book Store",
  description: "Manage your book store orders, products, and customers",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className={cn("text-xl font-bold", pacifico.className)}>
                BookHaven
              </span>
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">
                ADMIN
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
