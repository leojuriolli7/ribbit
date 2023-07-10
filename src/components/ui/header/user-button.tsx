"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import useClerkAppearance from "@/lib/hooks/useClerkAppearance";
import { usePathname } from "next/navigation";

export const UserButton = () => {
  const appearance = useClerkAppearance();
  const pathname = usePathname();

  return (
    <ClerkUserButton
      appearance={{
        ...appearance,
        userProfile: appearance,
      }}
      afterSignOutUrl={pathname}
    />
  );
};
