import { clerkComponentStyles } from "@/lib/constants";
import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Sign up",
};
export default function SignUpPage() {
  return (
    <div className="sm:w-auto w-full">
      <SignUp appearance={clerkComponentStyles} />
    </div>
  );
}
