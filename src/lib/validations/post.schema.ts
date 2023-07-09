import * as z from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(3, "Minimum of 3 characters"),
  userId: z.string(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const editPostSchema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(3, "Minimum of 3 characters"),
  slug: z.string(),
  userId: z.string(),
});

export type EditPostInput = z.infer<typeof editPostSchema>;
