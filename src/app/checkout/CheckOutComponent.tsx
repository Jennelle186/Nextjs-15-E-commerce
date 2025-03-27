"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import OrderSummary from "./OrderSummary";
import {
  ArrowLeft,
  CheckCircle2,
  Edit,
  Loader2,
  MapPin,
  Save,
  Truck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "../../../types/check-out";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { processCheckout } from "./action";
import { UserInfo } from "../../../types/users";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type CheckoutComponentProps = {
  userInfo: UserInfo;
};

const CheckoutComponent: React.FC<CheckoutComponentProps> = ({ userInfo }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [orderComplete, setOrderComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //useFormState for form submission instead of useActionState
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(processCheckout, null);

  //react-hook-fomr and zod resolver
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      id: userInfo.id,
      firstName: userInfo.firstName ?? "",
      middleName: userInfo.middleName ?? "",
      lastName: userInfo.lastName ?? "",
      email: userInfo.email ?? "",
      phoneNumber: userInfo.phoneNumber ?? "",
      street: userInfo.street ?? "",
      city: userInfo.city ?? "",
      province: userInfo.province ?? "",
      postalCode: userInfo.postalCode ?? "",
      country: userInfo.country ?? "",
      deliveryOption: "cod",
      notes: "",
    },
  });

  // Handle form submission success/error
  useEffect(() => {
    if (state?.success) {
      // Clear cart from localStorage
      localStorage.removeItem("cartItems");

      // Show success state
      setOrderComplete(true);

      toast({
        title: "Order Placed Successfully!",
        description:
          "Thank you for your purchase. Your order has been confirmed.",
      });

      // Redirect to confirmation page after a delay
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } else if (state?.message && !state.success) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, router, toast]);

  // Handle form submission
  const onSubmit = (data: CheckoutFormValues) => {
    startTransition(() => {
      // Create FormData object to submit
      const formData = new FormData();

      // Add all form fields to FormData, ensuring ID is included
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // 🔥 Add cart items from localStorage
      const cart = localStorage.getItem("cartItems");
      if (cart) {
        formData.append("cart", cart); // JSON stringified
      }

      // Submit the form
      formAction(formData);
    });
  };

  //when submitting the button to go to the next tab
  const handleContinueToDelivery = async () => {
    const isValid = await form.trigger();

    if (!isValid) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }

    setActiveTab("delivery");
  };

  //Restrict user from going to the next tab if the form is not complete
  const handleTabChange = async (nextTab: string) => {
    if (nextTab === "delivery" && activeTab === "profile") {
      const isValid = await form.trigger([
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "street",
        "city",
        "province",
        "postalCode",
        "country",
      ]);

      if (!isValid) {
        toast({
          title: "Please complete all required fields.",
          description:
            "Make sure all profile details are filled before continuing to delivery.",
          variant: "destructive",
        });
        return; // Block tab change
      }
    }

    setActiveTab(nextTab); // Allow tab change
  };

  if (orderComplete) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your order has been placed successfully.
        </p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="lg:col-span 2" variants={itemVariants}>
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/books")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shopping
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <input type="hidden" name="id" value={userInfo.id} />
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Information</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center"
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Done Editing
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Information
                  </>
                )}
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-300 data-[state=active]:to-rose-300 data-[state=active]:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  Delivery Information
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-300 data-[state=active]:to-rose-300 data-[state=active]:text-white"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Delivery Options
                </TabsTrigger>
              </TabsList>

              {/* Profile------- */}
              <TabsContent value="profile" className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
                      onClick={() => handleContinueToDelivery()}
                    >
                      Continue to Delivery Options
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Delivery */}
              <TabsContent value="delivery" className="pt-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="deliveryOption"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Delivery Option</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div>
                              <RadioGroupItem
                                value="cod"
                                id="cod"
                                className="peer sr-only"
                              />
                              <FormLabel
                                htmlFor="cod"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <svg
                                  className="mb-3 h-6 w-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2 8.5H22M6 16.5H8M12 16.5H14"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2 12.5V8.5C22 6.5 21 5.5 19 5.5H5C3 5.5 2 6.5 2 8.5V17.5C2 19.5 3 20.5 5 20.5H19C21 20.5 22 19.5 22 17.5V16.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Cash on Delivery
                              </FormLabel>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="pickup"
                                id="pickup"
                                className="peer sr-only"
                              />
                              <FormLabel
                                htmlFor="pickup"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Truck className="mb-3 h-6 w-6" />
                                Store Pickup
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special instructions for your order"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("profile")}
                    >
                      Back to Profile
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </motion.div>

      {/* Order Summary------------------ */}
      <motion.div className="lg:col-span-1" variants={itemVariants}>
        <div className="sticky top-24">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <OrderSummary />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutComponent;
