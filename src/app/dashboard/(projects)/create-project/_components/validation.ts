import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  liveUrl: z.string().url("Invalid URL"),
  frontendGithubRepoLink: z.string().url("Invalid URL"),
  backendGithubRepoLink: z.string().url("Invalid URL"),
  techStack: z.array(z.string()).nonempty("Select at least one technology"),
});
export type TProject = z.infer<typeof projectSchema>;