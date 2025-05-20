import { z } from "zod";

export const loginformSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});
export type LoginFormValues = z.infer<typeof loginformSchema>;
