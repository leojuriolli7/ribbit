import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPost() {
  return (
    <>
      <Skeleton className="w-full h-10 max-w-[350px]" />
      <div className="mt-4">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6 mt-2" />
      </div>
    </>
  );
}
