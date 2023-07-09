import { clerkComponentStyles } from "@/lib/constants";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn appearance={clerkComponentStyles} />;
}
