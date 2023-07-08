import { db } from "@/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeletePostButton } from "./delete-post-button";
import Text from "../text";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PostCardProps = {
  title: string;
  description: string | null;
  slug: string;
  className?: string;
};

const deletePost = (slug: string) => async () => {
  "use server";
  await db.delete(posts).where(eq(posts.slug, slug));

  revalidatePath("/");
};

export const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  slug,
  className,
}) => {
  return (
    <Link href={`posts/${slug}`}>
      <Card
        className={cn(
          "hover:shadow-xl transition-all dark:hover:border-zinc-700",
          className
        )}
      >
        <CardHeader>
          <CardTitle className="text-xl truncate">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="p" className="line-clamp-2 text-ellipsis">
            {description}
          </Text>
        </CardContent>

        <CardFooter>
          <form action={deletePost(slug)}>
            <DeletePostButton />
          </form>
        </CardFooter>
      </Card>
    </Link>
  );
};
