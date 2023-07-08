"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import slugify from "slugify";
import crypto from "crypto";
import type { CreatePostInput } from "@/lib/validations/post.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const randomHash = crypto
  .randomBytes(4)
  .toString("hex")
  .substring(4)
  .toLowerCase();

export const createPostAction = async (values: CreatePostInput) => {
  const generatedSlug = slugify(values.title, {
    lower: true,
  });

  const slug = `${generatedSlug}-${randomHash}`;

  await db.insert(posts).values({ ...values, slug });

  revalidatePath("/");
  return redirect(`/posts/${slug}`);
};
