"use server";

import { clerkClient } from "@clerk/nextjs";
import Text from "./text";

export default async function Author({
  userId,
  createdAt,
}: {
  userId: string;
  createdAt: Date | null;
}) {
  const author = await clerkClient.users.getUser(userId);
  const username = author?.firstName ?? author?.username;

  const createdAtString = createdAt ? ` at ${createdAt?.toLocaleString()}` : "";

  return (
    <Text variant="p">
      By{" "}
      <Text
        variant="p"
        as="span"
        className="text-green-500 dark:text-green-600"
      >
        {username}
      </Text>
      {createdAtString}
    </Text>
  );
}
