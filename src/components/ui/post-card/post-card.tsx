import { db } from "@/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeletePostButton } from "./delete-post-button";
import Text from "../text";

type PostCardProps = {
  title: string;
  description: string | null;
  id: number;
  className?: string;
};

const deletePost = (id: number) => async () => {
  "use server";
  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/");
};

export const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  id,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="p" className="line-clamp-2 text-ellipsis">
          {description}
        </Text>
      </CardContent>

      <CardFooter>
        <form action={deletePost(id)}>
          <DeletePostButton />
        </form>
      </CardFooter>
    </Card>
  );
};
