import * as z from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(3, "Minimum of 3 characters"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
