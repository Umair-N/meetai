import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "Password is required"),
});
