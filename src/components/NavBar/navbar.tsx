"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { BookOpenText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import LogoutButton from "./logOutButton";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

type Session = {
  user: {
    id: string;
    name?: string;
    email?: string;
  };
};

type NavItem = {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Browse Books", href: "/books" },
  { name: "Profile", href: "/profile" },
  { name: "Orders", href: "/orders" },
];

export default function Navbar({ session }: { session: Session | null }) {
  const isLoggedIn = !!session;

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //links that are accessible to non-logged in users as well
  const accessibleNavItems = isLoggedIn
    ? navItems
    : navItems.filter(
        (item) =>
          item.href === "/" || item.href === "/books" || item.href === "/about"
      );
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-rose-100">
              <BookOpenText className="w-5 h-5 text-indigo-500" />
            </div>
            <span
              className={cn(
                "text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500",
                pacifico.className
              )}
            >
              BookHaven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {accessibleNavItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <Button
                  className={cn(
                    ` bg-[#3D0C11] text-white hover:bg-[#2D090D] transition-all duration-300`,
                    !isScrolled &&
                      "bg-white/10 backdrop-blur-sm hover:bg-white/20",
                    "hover:scale-105"
                  )}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-rose-100">
                      <BookOpenText className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span
                      className={cn(
                        "text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500",
                        pacifico.className
                      )}
                    >
                      BookHaven
                    </span>
                  </Link>
                  <SheetClose asChild />
                </div>

                <nav className="flex flex-col space-y-1 mb-8">
                  {accessibleNavItems.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "px-4 py-3 rounded-md text-base font-medium transition-colors",
                          pathname === link.href
                            ? "text-indigo-600 bg-indigo-50"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto space-y-4">
                  {isLoggedIn ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login">
                      <Button
                        className={cn(
                          ` bg-[#3D0C11] text-white hover:bg-[#2D090D] transition-all duration-300`,
                          !isScrolled &&
                            "bg-white/10 backdrop-blur-sm hover:bg-white/20",
                          "hover:scale-105"
                        )}
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
