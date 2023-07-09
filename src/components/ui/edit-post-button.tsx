"use client";

import { Button } from "./button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ButtonHTMLAttributes } from "react";
import { Icons } from "./icons";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const iconAttrs = {
  width: 21,
  height: 21,
};

export const EditPostButton = (props: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isEditing = searchParams.has("edit");

  const onClickHref = isEditing ? pathname : `${pathname}?edit=true`;

  return (
    <Link href={onClickHref}>
      <Button {...props} size="icon" type="submit" variant="outline">
        {isEditing ? (
          <Icons.close {...iconAttrs} />
        ) : (
          <Icons.edit {...iconAttrs} />
        )}
      </Button>
    </Link>
  );
};
