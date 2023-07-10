"use client";

import useClerkAppearance from "@/lib/hooks/useClerkAppearance";
import { SignUp } from "@clerk/nextjs";

export const SignUpForm = ({ redirectUrl }: { redirectUrl?: string }) => {
  const appearance = useClerkAppearance();

  return (
    <div className="sm:w-auto w-full">
      <SignUp
        redirectUrl={redirectUrl}
        appearance={{
          ...appearance,
          elements: {
            card: "dark:bg-zinc-900/60 sm:w-[25rem] w-full",
            socialButtonsBlockButtonArrow: "sm:block hidden",
            rootBox: "m-0 w-full",
          },
        }}
      />
    </div>
  );
};
