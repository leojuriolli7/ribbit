"use client";

import useClerkAppearance from "@/lib/hooks/useClerkAppearance";
import { SignIn } from "@clerk/nextjs";

export const SignInForm = () => {
  const appearance = useClerkAppearance();

  return (
    <div className="sm:w-auto w-full">
      <SignIn appearance={appearance} />
    </div>
  );
};
