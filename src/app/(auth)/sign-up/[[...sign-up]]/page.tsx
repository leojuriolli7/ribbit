import { SignUpForm } from "@/components/forms/sign-up-form";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Sign up",
};
export default function SignUpPage() {
  return <SignUpForm />;
}
