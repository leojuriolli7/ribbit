/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { User } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type UnwantedKeys =
  | "emailAddresses"
  | "firstName"
  | "lastName"
  | "primaryEmailAddressId"
  | "primaryPhoneNumberId"
  | "phoneNumbers";

// object with data returned from webhook.
// can verify this in Clerk dashboard webhook logs.
interface UserInterface extends Omit<User, UnwantedKeys> {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
}

export const runtime = "edge";

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
    const {
      id,
      first_name: firstName,
      username,
      image_url: imageUrl,
      email_addresses,
      primary_email_address_id,
      last_name: lastName,
    } = evt.data;

    const emailObject = email_addresses?.find((email) => {
      return email.id === primary_email_address_id;
    });
    if (!emailObject) {
      return new Response("Error locating user", {
        status: 400,
      });
    }

    const primaryEmail = emailObject.email_address;

    const exists = await db.query.users.findFirst({
      where: eq(users.clerkId, id),
    });
    if (!!exists) {
      await db
        .update(users)
        .set({
          firstName,
          lastName,
          username,
          imageUrl,
          email: primaryEmail,
        })
        .where(eq(users.clerkId, id));
    } else {
      await db.insert(users).values({
        firstName,
        lastName,
        email: primaryEmail,
        username,
        imageUrl,
        clerkId: id,
      });
    }
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    await db.delete(users).where(eq(users.clerkId, id));
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

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";
