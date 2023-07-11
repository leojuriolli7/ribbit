"use server";

import { CommentSkeleton } from "./comment-skeleton";

const COMMENTS = Array.from({ length: 4 });

export const CommentSectionSkeleton = () => {
  return (
    <div className="w-full mt-6">
      <div className="flex flex-col gap-4">
        {COMMENTS?.map((_, i) => {
          return <CommentSkeleton key={i} />;
        })}
      </div>
    </div>
  );
};
