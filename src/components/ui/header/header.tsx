"use server";

import Logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import Text from "../text";
import { Icons } from "../icons";
import { ThemeSwitch } from "../theme-switch";
import { SignedIn, auth } from "@clerk/nextjs";
import { UserButton } from "./user-button";
import { AuthButtonWrapper } from "./auth-button-wrapper";

const iconAttrs = {
  className: "sm:w-[18px] sm:h-[18px] w-5 h-5",
};

export const Header = () => {
  const { userId } = auth();

  return (
    <header className="sm:px-5 px-0 py-5 flex items-center justify-between w-full border-b dark:border-zinc-800 mb-5">
      <nav className="sm:flex block items-end gap-4">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <Image
              placeholder="blur"
              src={Logo}
              width={40}
              height={40}
              alt="Frog icon in a green background"
              className="rounded-md"
            />
            <Text variant="h1">Ribbit</Text>
          </div>
        </Link>
      </nav>

      <div className="flex gap-2 items-center">
        <AuthButtonWrapper isLoggedIn={!!userId}>
          <Button
            variant="brand"
            className="flex gap-1 items-center h-9 sm:w-auto w-9 sm:px-2 sm:py-2 px-0 py-0"
          >
            {userId ? (
              <Icons.plus {...iconAttrs} />
            ) : (
              <Icons.login {...iconAttrs} />
            )}

            <span className="hidden sm:block">
              {userId ? "New post" : "Login"}
            </span>
          </Button>
        </AuthButtonWrapper>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <ThemeSwitch />
      </div>
    </header>
  );
};
