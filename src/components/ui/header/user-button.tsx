"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import useClerkAppearance from "@/lib/hooks/useClerkAppearance";

export const UserButton = () => {
  const appearance = useClerkAppearance();

  return (
    <ClerkUserButton
      appearance={{
        ...appearance,
        userProfile: appearance,
      }}
      afterSignOutUrl="/"
    />
  );
};
