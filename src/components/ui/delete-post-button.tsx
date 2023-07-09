"use client";

import { Button } from "./button";
import { Icons } from "./icons";
import { ConfirmDialog } from "./confirm-dialog";
import { useTransition } from "react";
import { deletePostAction } from "@/app/_actions/post.actions";

export const DeletePostButton = ({ slug }: { slug: string }) => {
  const [deleting, startTransition] = useTransition();

  const onClickDelete = () => startTransition(() => deletePostAction(slug));

  return (
    <ConfirmDialog
      loading={deleting}
      onClickDelete={onClickDelete}
      confirmButtonMessage="Delete post"
      title="Are you sure you want to delete this post?"
      trigger={
        <Button
          disabled={deleting}
          size="icon"
          variant="destructive"
          type="button"
        >
          <Icons.delete width={21} height={21} />
        </Button>
      }
    />
  );
};
