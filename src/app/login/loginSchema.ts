import {z} from 'zod';
import { passwordSchema } from '../../../validation/passwordSchema';

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: passwordSchema,
});