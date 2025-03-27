// app/checkout/page.tsx
import { createClient } from "../../../utils/supabase/server";
import LoginRedirectNotice from "@/components/loginRedirectNotice";
import CheckoutComponent from "./CheckOutComponent";
import { Pacifico } from "next/font/google";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { UserInfo } from "../../../types/users";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Checkout | Book Store",
  description:
    "Complete your purchase and get ready for your reading adventure",
};

const Checkout = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userInfo } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!userInfo || userInfo.length === 0) {
    return <LoginRedirectNotice />;
  }

  // If not logged in, show the notice component
  if (!user) {
    return <LoginRedirectNotice />;
  }

  // Otherwise, show the checkout page
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Your
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300 ml-2",
                pacifico.className
              )}
            >
              Purchase
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You&apos;re just a few steps away from starting your next reading
            adventure. Fill in your details below to complete your order.
          </p>
        </div>

        <CheckoutComponent userInfo={userInfo as UserInfo} />
      </div>
    </div>
  );
};

export default Checkout;
