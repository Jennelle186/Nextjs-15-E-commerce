import { LoginForm } from "@/app/login/login-form";
import Image from "next/image";
import Link from "next/link";
import { BookOpenText } from "lucide-react";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 relative">
        {/* Logo and navigation */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold transition-all duration-300 hover:scale-105"
          >
            <BookOpenText className="h-6 w-6 text-indigo-500" />
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500",
                pacifico.className
              )}
            >
              BookHaven
            </span>
          </Link>
        </div>

        {/* Login form container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md px-6 py-12 md:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue your reading journey
              </p>
            </div>
            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-auto pb-4">
          <p>
            &copy; {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
        </div>
      </div>

      {/* Image section with overlay and text */}
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 z-10"></div>
        <Image
          src="/login-pic.jpg"
          alt="Books on a shelf"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-12">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl max-w-md text-white">
            <h2 className={cn("text-3xl mb-4 font-bold", pacifico.className)}>
              Discover Your Next Adventure
            </h2>
            <p className="mb-6 text-white/90">
              &quot;A reader lives a thousand lives before he dies. The man who
              never reads lives only one.&quot;
              <span className="block mt-2 text-sm font-medium">
                — George R.R. Martin
              </span>
            </p>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-white/70"></div>
              <div className="h-2 w-2 rounded-full bg-white/40"></div>
              <div className="h-2 w-2 rounded-full bg-white/40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
