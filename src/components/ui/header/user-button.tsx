"use client";

import { useTheme } from "next-themes";
import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { clerkPrimaryColor } from "@/lib/constants";

export const UserButton = () => {
  const { theme } = useTheme();

  const clerkWidgetTheme = theme === "dark" ? dark : undefined;

  return (
    <ClerkUserButton
      appearance={{
        baseTheme: clerkWidgetTheme,
        variables: {
          colorPrimary: clerkPrimaryColor,
        },
        userProfile: {
          baseTheme: clerkWidgetTheme,
          variables: {
            colorPrimary: clerkPrimaryColor,
          },
        },
      }}
      afterSignOutUrl="/"
    />
  );
};
