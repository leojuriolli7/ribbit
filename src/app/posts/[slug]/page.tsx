import { cache } from "react";
import { DeletePostButton } from "@/components/ui/delete-post-button";
import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export const runtime = "edge";

const getPost = cache(async (slug: string) => {
  if (!slug) notFound();

  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  if (!post) notFound();

  return post;
});

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.description,
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

const deletePost = (slug: string) => async () => {
  "use server";
  await db.delete(posts).where(eq(posts.slug, slug));

  revalidatePath("/");
  redirect("/");
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params?.slug);
  const { userId } = auth();

  const userIsOP = userId === post?.userId;

  return (
    <main>
      <article className="p-6 dark:bg-zinc-900/40 bg-white rounded-xl mb-5 border border-zinc-200 shadow dark:border-zinc-800">
        <Text variant="h2">{post?.title}</Text>
        <Text variant="p" className="whitespace-break-spaces">
          {post?.description}
        </Text>
      </article>

      {userIsOP && (
        <div className="pt-4 border-t dark:border-zinc-800">
          <form action={deletePost(params?.slug)}>
            <DeletePostButton />
          </form>
        </div>
      )}
    </main>
  );
}
