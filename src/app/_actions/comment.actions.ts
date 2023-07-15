"use server";

import { db } from "@/db";
import { comments } from "@/db/schema";
import type {
  CreateCommentInput,
  EditCommentInput,
} from "@/lib/validations/comment.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createCommentAction = async ({
  postId,
  text,
  userId,
  slug,
  /** Pass this to reply to a comment. */
  parentId,
}: CreateCommentInput) => {
  await db.insert(comments).values({
    userId,
    text,
    postId,
    ...(typeof parentId === "number" && { parentId }),
  });

  revalidatePath(`/posts/${slug}`);
};

export const editCommentAction = async ({
  commentId,
  text,
  slug,
}: EditCommentInput) => {
  await db
    .update(comments)
    .set({
      text,
    })
    .where(eq(comments.id, commentId));

  revalidatePath(`/posts/${slug}`);
};

export const deleteCommentAction = async ({
  idToDelete,
  postSlug,
}: {
  idToDelete: number;
  postSlug: string;
}) => {
  await db.delete(comments).where(eq(comments.id, idToDelete));

  revalidatePath(`/posts/${postSlug}`);
};
