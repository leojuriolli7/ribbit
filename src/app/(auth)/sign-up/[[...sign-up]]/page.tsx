import { clerkComponentStyles } from "@/lib/constants";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp appearance={clerkComponentStyles} />;
}
