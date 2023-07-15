import * as z from "zod";

export const createCommentSchema = z.object({
  text: z.string().trim().min(3, "Required"),
  userId: z.string().nonempty(),
  postId: z.number(),
  slug: z.string().nonempty(),
  parentId: z.number().optional(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export const editCommentSchema = z.object({
  text: z.string().trim().min(3, "Required"),
  commentId: z.number(),
  slug: z.string().nonempty(),
});

export type EditCommentInput = z.infer<typeof editCommentSchema>;
