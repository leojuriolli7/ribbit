import { clerkComponentStyles } from "@/lib/constants";
import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return <SignIn appearance={clerkComponentStyles} />;
}
