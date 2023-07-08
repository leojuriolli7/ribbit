"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const DeletePostButton = () => {
  const { pending: deleting } = useFormStatus();

  return (
    <Button disabled={deleting} size="icon" variant="destructive" type="submit">
      <TrashIcon width={21} height={21} />
    </Button>
  );
};
