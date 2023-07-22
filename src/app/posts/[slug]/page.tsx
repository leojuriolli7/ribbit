import { Suspense, cache } from "react";
import { DeletePostButton } from "@/components/ui/delete-post-button";
import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { EditPostButton } from "@/components/ui/edit-post-button";
import { EditPostForm } from "@/components/forms/edit-post-form";
import PostAuthor from "@/components/ui/post-author";
import { CreateCommentForm } from "@/components/forms/create-comment-form";
import CommentSection from "@/components/ui/comments/comment-section";
import { CommentSectionSkeleton } from "@/components/ui/comments/comment-section-skeleton";
import { PostAuthorSkeleton } from "@/components/ui/post-author-skeleton";

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

  const user = await currentUser();
  const userIsOP = !!post && user?.publicMetadata.databaseId === post?.userId;

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
            <Suspense fallback={<PostAuthorSkeleton />}>
              <PostAuthor {...post} />
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

      <div className="w-full mt-6 pt-4 border-t dark:border-zinc-800">
        <Text variant="h2">Comments</Text>

        <div className="sm:w-auto w-full">
          <CreateCommentForm postId={post.id} slug={post.slug} />
        </div>
      </div>

      <Suspense fallback={<CommentSectionSkeleton />}>
        <CommentSection postId={post.id} />
      </Suspense>
    </main>
  );
}
