import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { CreatePostForm } from "@/components/forms/create-post-form";

async function getPosts() {
  return await db.select().from(posts);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-24">
      <Text variant="h1">Ribbit</Text>
      <Text variant="lead" className="mt-1">
        Start by creating a post:
      </Text>

      <CreatePostForm />

      <div className="flex flex-wrap gap-4 mt-6 w-full max-w-4xl">
        {posts?.map((post) => (
          <article
            className="shadow-sm p-8 border rounded-md w-64"
            key={post.id}
          >
            <Text variant="h3">{post.title}</Text>
            <Text variant="mutedText" className="mt-2">
              {post.description}
            </Text>
          </article>
        ))}
      </div>
    </main>
  );
}
