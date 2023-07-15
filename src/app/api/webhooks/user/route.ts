/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import type { User as UserInterface } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { headers } from "next/headers";
import type { UserWebhookEvent } from "@clerk/clerk-sdk-node";

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
  let evt: UserWebhookEvent | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as UserWebhookEvent;
  } catch (_) {
    console.log("error");
    return new Response("Error occured", {
      status: 400,
    });
  }
  // Handle the webhook
  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    console.log("webhook data: ", evt.data);
  }
  return new Response("", {
    status: 201,
  });
}
