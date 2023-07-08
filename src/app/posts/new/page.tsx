import Text from "@/components/ui/text";
import { CreatePostForm } from "@/components/forms/create-post-form";

export default function Home() {
  return (
    <main>
      <Text variant="h2" className="mt-1">
        Create a post
      </Text>

      <CreatePostForm />
    </main>
  );
}
