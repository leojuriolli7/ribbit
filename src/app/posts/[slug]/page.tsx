import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getPost(slug: string) {
  if (!slug) throw new Error("No slug provided");

  return await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params?.slug);

  return (
    <main>
      <Text variant="h2">{post?.title}</Text>

      <Text variant="p">{post?.description}</Text>
    </main>
  );
}
