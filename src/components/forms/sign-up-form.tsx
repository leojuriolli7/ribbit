"use client";

import useClerkAppearance from "@/lib/hooks/useClerkAppearance";
import { SignUp } from "@clerk/nextjs";

export const SignUpForm = () => {
  const appearance = useClerkAppearance();

  return (
    <div className="sm:w-auto w-full">
      <SignUp appearance={appearance} />
    </div>
  );
};
