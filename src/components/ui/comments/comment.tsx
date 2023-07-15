"use server";

import { cn } from "@/lib/utils";
import type { CommentWithChildren } from "./comment-section";
import { CommentsList } from "./comments-list";
import { CommentOptions } from "./comment-options";
import CommentAuthor from "./comment-author";
import { Suspense } from "react";
import { CommentAuthorSkeleton } from "./comment-author-skeleton";
import { SignedIn } from "@clerk/nextjs";
import { CommentText } from "./comment-text";

export const Comment = (comment: CommentWithChildren) => {
  const hasChildren = !!comment?.children?.length;
  const hasParent = !!comment?.parentId;

  return (
    <div
      className={cn(
        "dark:bg-zinc-900/40 bg-white rounded-xl border border-zinc-200 shadow dark:border-zinc-800 p-4",
        hasParent && "ml-2"
      )}
    >
      <div className={cn(hasChildren && "mb-4")}>
        <Suspense fallback={<CommentAuthorSkeleton />}>
          <CommentAuthor
            authorId={comment.userId}
            createdAt={comment.createdAt}
          />
        </Suspense>
        <CommentText {...comment} />

        <SignedIn>
          <CommentOptions
            postId={comment.postId as number}
            commentId={comment.id}
            authorId={comment.userId}
            commentText={comment.text}
          />
        </SignedIn>
      </div>

      {hasChildren && <CommentsList comments={comment?.children} />}
    </div>
  );
};
