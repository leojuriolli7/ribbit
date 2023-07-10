import { SignInForm } from "@/components/forms/sign-in-form";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return <SignInForm />;
}
