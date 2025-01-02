import {z} from 'zod'

export const profileSchema = z.object({
    id: z.string().optional(),
    firstName : z.string().nonempty({
        message: "First name is required"
    }).min(2, {
        message: "First name must be at least 2 characters long"
    }),
    lastName : z.string().nonempty({
        message: "First name is required"
    }).min(2, {
        message: "First name must be at least 2 characters long"
    }),
    middleName : z.string().optional(),
    email: z.string().email({
        message: "Invalid email address"
    }),
    username: z.string().optional(),
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    province: z.string().min(1, { message: 'Province is required' }),
    postalCode: z
    .string()
    .nonempty({ message: "Postal code is required" })
    .regex(/^\d{4}$/, {
      message: "Postal code must be exactly 4 digits",
    }),
    country: z.string().min(1, { message: 'Country is required' }),
    avatar_url: z.string().optional(),
    phoneNumber: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^\+63\d{10}$/, {
      message: "Phone number must start with +63 and be followed by 10 digits",
    }),})
