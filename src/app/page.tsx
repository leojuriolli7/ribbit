import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { PostCard } from "@/components/ui/post-card";
import { desc } from "drizzle-orm";

async function getPosts() {
  return await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <Text variant="h2" className="mt-6">
        Past posts
      </Text>

      <div className="mt-2 w-full max-w-4xl">
        <div className="flex flex-wrap gap-4">
          {posts?.map((post) => (
            <PostCard className="w-64" {...post} key={post.id} />
          ))}
        </div>

        {!posts?.length && <Text variant="mutedText">No posts found.</Text>}
      </div>
    </main>
  );
}
