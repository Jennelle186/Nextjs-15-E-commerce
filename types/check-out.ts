import { z } from "zod"

// Schema for user information
export const userSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  street: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  province: z.string().min(2, { message: "Province must be at least 2 characters" }),
  postalCode: z.string().min(4, { message: "Postal code must be at least 4 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
})

// Schema for checkout form
export const checkoutFormSchema = z.object({
  // User information (including ID)
  id: z.string().uuid(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),

  // Address information
  street: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  province: z.string().min(2, { message: "Province must be at least 2 characters" }),
  postalCode: z.string().min(4, { message: "Postal code must be at least 4 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),

  // Delivery options
  deliveryOption: z.enum(["cod", "pickup"], {
    required_error: "Please select a delivery option",
  }),

  // Order notes (optional)
  notes: z.string().optional(),


})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export type FormState = {
  errors?: Record<string, string[]>
  message?: string
  success?: boolean
}

