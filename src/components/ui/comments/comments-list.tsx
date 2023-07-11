"use server";

import type { CommentWithChildren } from "./comment-section";
import { Comment } from "./comment";

export const CommentsList = ({
  comments,
}: {
  comments: CommentWithChildren[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </div>
  );
};
