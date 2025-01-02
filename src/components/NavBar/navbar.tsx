"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LogoutButton from "./logOutButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/orders", label: "My Orders" },
  { href: "/about", label: "About" },
];

export default function Navbar({ session }: { session: any }) {
  const isLoggedIn = !!session;

  // Filter links based on authentication status
  const accessibleLinks = isLoggedIn
    ? links
    : links.filter((link) => link.href === "/" || link.href === "/about");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-16">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="flex flex-1">
          <Sheet>
            <SheetTitle></SheetTitle>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileLink
                href="/"
                className="flex items-center"
                onOpenChange={() => {}}
              >
                Book Haven
              </MobileLink>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {accessibleLinks.map((link) => (
                    <MobileLink
                      key={link.href}
                      href={link.href}
                      onOpenChange={() => {}}
                    >
                      {link.label}
                    </MobileLink>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            Book Haven
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {accessibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* If user is logged in or not */}

          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <>
              {" "}
              <nav className="flex items-censter">
                <Link href="/login">
                  {" "}
                  <Button variant="ghost" className="hidden md:inline-flex">
                    Sign In
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button className="hidden md:inline-flex">Sign Up</Button>
                </Link>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
