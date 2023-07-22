"use server";

import Text from "./text";
import Image from "next/image";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function PostAuthor({
  userId,
  createdAt,
}: {
  userId: number;
  createdAt: Date | null;
}) {
  const author = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!author) return null;

  const username = author?.firstName ?? author?.username ?? "Anon";
  const createdAtString = createdAt ? ` @ ${createdAt?.toLocaleString()}` : "";

  return (
    <div className="w-full flex gap-2 items-center">
      <Image
        src={author?.imageUrl}
        width={32}
        height={32}
        className="mt-6 rounded-full"
        alt={`${username} profile picture`}
      />
      <Text variant="p">
        <Text
          variant="p"
          as="span"
          className="text-green-500 dark:text-green-600"
        >
          {username}
        </Text>
        <Text variant="p" as="span" className="text-zinc-500">
          {createdAtString}
        </Text>
      </Text>
    </div>
  );
}
