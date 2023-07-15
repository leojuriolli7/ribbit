/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { User as UserInterface } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId);
    console.log("svixIdTimeStamp", svixIdTimeStamp);
    console.log("svixSignature", svixSignature);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (_) {
    console.log("error");
    return new Response("Error occured", {
      status: 400,
    });
  }
  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, firstName, username, imageUrl } = evt.data;

    const exists = await db.query.users.findFirst({
      where: eq(users.clerkId, id),
    });
    if (!!exists) {
      await db
        .update(users)
        .set({ firstName, username, imageUrl })
        .where(eq(users.clerkId, id));
    } else {
      await db.insert(users).values({
        firstName,
        username,
        imageUrl,
        clerkId: id,
      });
    }
  }
  return new Response("", {
    status: 201,
  });
}

type Event = {
  data: UserInterface;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";
