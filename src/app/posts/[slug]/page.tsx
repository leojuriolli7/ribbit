import { DeletePostButton } from "@/components/ui/delete-post-button";
import Text from "@/components/ui/text";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = "edge";

async function getPost(slug: string) {
  if (!slug) throw new Error("No slug provided");

  return await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });
}

const deletePost = (slug: string) => async () => {
  "use server";
  await db.delete(posts).where(eq(posts.slug, slug));

  revalidatePath("/");
  redirect("/");
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params?.slug);

  return (
    <main>
      <article className="pb-4">
        <Text variant="h2">{post?.title}</Text>
        <Text variant="p">{post?.description}</Text>
      </article>

      <div className="pt-4 border-t dark:border-zinc-800">
        <form action={deletePost(params?.slug)}>
          <DeletePostButton />
        </form>
      </div>
    </main>
  );
}
