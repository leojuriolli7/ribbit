"use client";

import { useSearchParams } from "next/navigation";
import Text from "../text";

type Props = {
  text: string;
  id: number;
};

export const CommentText = ({ id, text }: Props) => {
  const params = useSearchParams();

  const currentlyEditing = params.get("editingComment");
  const hideText = currentlyEditing === String(id);

  return !hideText && <Text variant="p">{text}</Text>;
};
