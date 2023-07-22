"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../icons";
import { Button } from "../button";

export const LoginButton = () => {
  const pathname = usePathname();

  return (
    <Link href={`/sign-in?redirectUrl=${pathname}`}>
      <Button
        variant="brand"
        className="flex gap-1 items-center h-9 sm:w-auto w-9 sm:px-2 sm:py-2 px-0 py-0"
      >
        <Icons.login className="sm:w-[18px] sm:h-[18px] w-5 h-5" />
        <span className="hidden sm:block">Login</span>
      </Button>
    </Link>
  );
};
