import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title is required").optional(),
    content: z.string().min(10, "Description must be at least 10 characters").optional(),
  
});
export type TProject = z.infer<typeof blogSchema>;