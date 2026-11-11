import { z } from "zod/v4"

export const loginSchema = z.object({
  email: z.email({ error: "Incorrect email address" }),
  password: z.string().min(4),
  rememberMe: z.boolean(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>
