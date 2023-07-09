"use client";

import { Button } from "./button";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Icons } from "./icons";

export const DeletePostButton = () => {
  const { pending: deleting } = useFormStatus();

  return (
    <Button disabled={deleting} size="icon" variant="destructive" type="submit">
      <Icons.delete width={21} height={21} />
    </Button>
  );
};
