"use server";

import { Skeleton } from "./skeleton";

export const PostAuthorSkeleton = () => {
  return (
    <div className="w-full flex gap-2 items-center">
      <Skeleton className="w-24 h-[14px]" />
      <Skeleton className="w-24 h-5 mt-6" />
    </div>
  );
};
