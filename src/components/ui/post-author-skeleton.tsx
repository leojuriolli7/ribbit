"use server";

import { Skeleton } from "./skeleton";

export const PostAuthorSkeleton = () => {
  return (
    <div className="w-full flex gap-2 items-center">
      <Skeleton className="rounded-full w-8 h-8" />
      <Skeleton className="w-24 h-5 mt-6" />
    </div>
  );
};
