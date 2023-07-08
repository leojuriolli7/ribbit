"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import type { CreatePostInput } from "@/lib/validations/post.schema";
import { revalidatePath } from "next/cache";

export const createPostAction = async (values: CreatePostInput) => {
  await db.insert(posts).values(values);

  revalidatePath("/");
  return;
};
