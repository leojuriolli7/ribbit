"use server";

import Logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import Text from "./text";
import { Icons } from "./icons";
import { ThemeSwitch } from "./theme-switch";

export const Header = () => (
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
      <Link href="/posts/new">
        <Button
          variant="brand"
          className="flex gap-1 items-center h-9 sm:w-auto w-9 sm:px-2 sm:py-2 px-0 py-0"
        >
          <Icons.plus className="sm:w-[18px] sm:h-[18px] w-5 h-5" />

          <span className="hidden sm:block">New post</span>
        </Button>
      </Link>

      <ThemeSwitch />
    </div>
  </header>
);
