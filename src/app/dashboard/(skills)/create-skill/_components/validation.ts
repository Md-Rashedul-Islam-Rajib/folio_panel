import { z } from "zod";

export const skillSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    category: z.string().min(2, { message: "Category must be at least 2 characters long" }),
})

export type skillSchemaType = z.infer<typeof skillSchema>;