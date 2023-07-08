import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Text from "./text";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PostCardProps = {
  title: string;
  description: string | null;
  slug: string;
  className?: string;
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
      </Card>
    </Link>
  );
};
