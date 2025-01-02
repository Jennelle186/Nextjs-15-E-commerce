import { z } from 'zod'

export const authorSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be at most 50 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be at most 50 characters' }),
  middleName: z
    .string()
    .max(50, { message: 'Middle name must be at most 50 characters' })
    .optional(),
})

export type AuthorFormState =
  | {
      errors?: {
        firstName?: string[]
        lastName?: string[]
        middleName?: string[]
      }
      message?: string
    }
  | undefined