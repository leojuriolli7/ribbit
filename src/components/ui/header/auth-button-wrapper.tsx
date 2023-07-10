"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Client component wrapper for redirecting to sign in with a redirect url.
 * This contributes to a seamless auth flow.
 */
export const AuthButtonWrapper = ({
  isLoggedIn,
  children,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Link href={isLoggedIn ? "/new" : `/sign-in?redirectUrl=${pathname}`}>
      {children}
    </Link>
  );
};
