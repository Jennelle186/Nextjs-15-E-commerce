import {z} from 'zod';

export const passwordSchema = z
    .string()
    .min(6, { message: "Minimum 6 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "At least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "At least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "At least one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "At least one special character",
    })