/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "@/db";
import { users } from "@/db/schema";
import type { IncomingHttpHeaders } from "http";
import type { User } from "@clerk/nextjs/api";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { eq } from "drizzle-orm";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

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

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: User;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
