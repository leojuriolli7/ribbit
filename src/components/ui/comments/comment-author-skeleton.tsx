"use server";

import { Skeleton } from "../skeleton";

export const CommentAuthorSkeleton = () => {
  return (
    <div className="flex gap-2 items-center">
      <Skeleton className="rounded-full w-8 h-8" />
      <Skeleton className="w-24 h-[14px]" />
    </div>
  );
};
