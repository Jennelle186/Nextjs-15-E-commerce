"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const LoginRedirectNotice = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000); // 3-second delay before redirect

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Login Required</AlertTitle>
        <AlertDescription>
          You must be logged in to proceed to checkout. Redirecting to login...
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LoginRedirectNotice;
