"use server";

import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CommentsList } from "./comments-list";

type Comment = {
  parentId: number | null;
  id: number;
  userId: string;
  text: string;
  postId: number | null;
  createdAt: Date | null;
};

export type CommentWithChildren = Comment & {
  children: CommentWithChildren[];
};

/**
 * Format comments from the database and group them with their
 * children/parents before rendering.
 */
function formatComments(comments: Array<Comment>) {
  const map = new Map<number, number>();

  const commentsWithChildren: CommentWithChildren[] = comments?.map(
    (comment) => ({
      ...comment,
      children: [],
    })
  );

  const roots: Array<CommentWithChildren> = commentsWithChildren?.filter(
    (comment) => comment.parentId === null
  );

  commentsWithChildren?.forEach((comment, i) => {
    map.set(comment.id, i);
  });

  for (let i = 0; i < comments.length; i++) {
    if (typeof commentsWithChildren[i]?.parentId === "number") {
      const parentCommentIndex = map.get(
        commentsWithChildren[i].parentId as number
      ) as number;

      commentsWithChildren[parentCommentIndex]?.children.push(
        commentsWithChildren[i]
      );

      continue;
    }

    continue;
  }

  return roots;
}

const getComments = async (postId: number) => {
  return await db.query.comments.findMany({
    where: eq(comments.postId, postId),
  });
};

export default async function CommentSection({ postId }: { postId: number }) {
  const comments = await getComments(postId);
  const formattedComments = formatComments(comments);

  return (
    <div className="w-full mt-6">
      <CommentsList comments={formattedComments} />
    </div>
  );
}
