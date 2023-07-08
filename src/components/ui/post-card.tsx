import { db } from "@/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { TrashIcon } from "@radix-ui/react-icons";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Button } from "./button";

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
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>

      <CardFooter>
        <form action={deletePost(id)}>
          <Button size="icon" variant="destructive" type="submit">
            <TrashIcon width={21} height={21} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
