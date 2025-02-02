"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Pacifico } from "next/font/google";
import LogoutButton from "./logOutButton";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

type NavItem = {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
const NavBar = ({ session }: { session: any }) => {
  const isLoggedIn = !!session;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const accessibleNavItems = isLoggedIn
    ? navItems
    : navItems.filter((item) => item.href === "/" || item.href === "/about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : " backdrop-blur-md py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={` text-2xl font-bold transition-all duration-300 hover:scale-105`}
          >
            <span
              className={cn(
                isScrolled
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300"
                  : "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                pacifico.className
              )}
            >
              BookHaven
            </span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            {accessibleNavItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    ` text-sm transition-colors duration-300 group-hover:text-rose-300`,
                    isScrolled ? "text-gray-700" : "text-gray-300",
                    "flex items-center"
                  )}
                >
                  {item.name}
                  {item.subItems && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
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
          <button
            className="md:hidden text-white transition-transform duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 shadow-md overflow-hidden bg-white/30 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {accessibleNavItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-[#3D0C11] transition-colors duration-300 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
