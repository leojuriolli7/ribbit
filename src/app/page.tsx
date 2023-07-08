import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { CreatePostForm } from "@/components/forms/create-post-form";
import { PostCard } from "@/components/ui/post-card";

async function getPosts() {
  return await db.select().from(posts);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <Text variant="h2" className="mt-1">
        Create a post
      </Text>

      <CreatePostForm />

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
