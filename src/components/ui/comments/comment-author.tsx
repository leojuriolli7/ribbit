"use server";

import { clerkClient } from "@clerk/nextjs";
import Text from "../text";
import Image from "next/image";

export default async function CommentAuthor({
  authorId,
  createdAt,
}: {
  authorId: string;
  createdAt: Date | null;
}) {
  const author = await clerkClient.users.getUser(authorId);
  const username = author?.firstName ?? author?.username ?? "Anon";

  const createdAtString = createdAt ? ` @ ${createdAt?.toLocaleString()}` : "";

  return (
    <div className="flex gap-2 items-center">
      <Image
        src={author?.imageUrl}
        width={32}
        height={32}
        className="rounded-full"
        alt={`${username} profile picture`}
      />
      <Text variant="smallText" as="p">
        {username}{" "}
        <Text variant="smallText" as="span" className="text-zinc-500">
          {createdAtString}
        </Text>
      </Text>
    </div>
  );
}
