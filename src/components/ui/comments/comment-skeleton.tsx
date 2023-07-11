"use server";

import { Skeleton } from "../skeleton";

export const CommentSkeleton = () => {
  return (
    <div className="dark:bg-zinc-900/40 bg-white rounded-xl border border-zinc-200 shadow dark:border-zinc-800 p-4">
      <div>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-full h-7 mt-6" />
        <Skeleton className="w-full h-7 mt-2" />

        <Skeleton className="w-9 h-5 mt-2" />
      </div>
    </div>
  );
};
