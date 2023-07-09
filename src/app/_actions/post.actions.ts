"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import slugify from "slugify";
import type {
  CreatePostInput,
  EditPostInput,
} from "@/lib/validations/post.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

function getRandomHash() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export const createPostAction = async (values: CreatePostInput) => {
  const randomHash = getRandomHash();

  const generatedSlug = slugify(values.title, {
    lower: true,
  });

  const slug = `${generatedSlug}-${randomHash}`;

  await db.insert(posts).values({ ...values, slug });

  revalidatePath("/");
  redirect(`/posts/${slug}`);
};

export const editPostAction = async (values: EditPostInput) => {
  await db
    .update(posts)
    .set({
      description: values.description,
      title: values.title,
    })
    .where(eq(posts.slug, values.slug));

  revalidatePath(`/posts/${values.slug}`);
};
