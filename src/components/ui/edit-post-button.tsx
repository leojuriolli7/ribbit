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
    <Link href={onClickHref} replace>
      <Button
        {...props}
        size="icon"
        type="submit"
        variant="outline"
        aria-label={isEditing ? "Cancel" : "Edit this post"}
      >
        {isEditing ? (
          <Icons.close {...iconAttrs} />
        ) : (
          <Icons.edit {...iconAttrs} />
        )}
      </Button>
    </Link>
  );
};
