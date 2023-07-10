"use server";

import { clerkClient } from "@clerk/nextjs";
import Text from "./text";
import Image from "next/image";

export default async function Author({
  userId,
  createdAt,
}: {
  userId: string;
  createdAt: Date | null;
}) {
  const author = await clerkClient.users.getUser(userId);
  const username = author?.firstName ?? author?.username ?? "Anon";

  const createdAtString = createdAt ? ` at ${createdAt?.toLocaleString()}` : "";

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
        {createdAtString}
      </Text>
    </div>
  );
}
