import { Suspense, cache } from "react";
import { DeletePostButton } from "@/components/ui/delete-post-button";
import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { EditPostButton } from "@/components/ui/edit-post-button";
import { EditPostForm } from "@/components/forms/edit-post-form";
import { Skeleton } from "@/components/ui/skeleton";
import Author from "@/components/ui/author";

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

export default async function PostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    edit: string;
  };
}) {
  const post = await getPost(params?.slug);

  const { userId } = auth();
  const userIsOP = !!post && userId === post?.userId;

  const showEditForm = !!searchParams.edit && userIsOP;

  return (
    <main>
      <article className="p-6 dark:bg-zinc-900/40 bg-white rounded-xl mb-5 border border-zinc-200 shadow dark:border-zinc-800">
        {showEditForm ? (
          <EditPostForm {...post} />
        ) : (
          <>
            <Text variant="h2">{post?.title}</Text>
            {/* Streaming: this will load after the post loads, without blocking the page from loading. */}
            <Suspense fallback={<Skeleton className="w-24 h-5 mt-6" />}>
              <Author {...post} />
            </Suspense>
            <Text variant="p" className="whitespace-break-spaces">
              {post?.description}
            </Text>
          </>
        )}
      </article>

      {userIsOP && (
        <div className="flex gap-2 items-center pt-4 border-t dark:border-zinc-800">
          <DeletePostButton slug={params.slug} />

          <EditPostButton />
        </div>
      )}
    </main>
  );
}
