import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Description must be at least 10 characters")
});
export type TProject = z.infer<typeof blogSchema>;