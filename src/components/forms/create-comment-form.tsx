"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateCommentInput,
  createCommentSchema,
} from "@/lib/validations/comment.schema";
import { useTransition } from "react";
import { createCommentAction } from "@/app/_actions/comment.actions";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  postId: number;
  parentId?: number;
};

export const CreateCommentForm = ({ postId, slug, parentId }: Props) => {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const isReply = !!parentId;

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: undefined,
      ...(userId && { userId }),
      postId,
      slug,
      parentId,
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const onSubmit = (values: CreateCommentInput) => {
    startTransition(async () => {
      await createCommentAction(values);

      setValue("text", "");
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <Form {...methods}>
      <form className="sm:w-64 w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="text"
          render={({ field }) => (
            <FormItem className={cn(isReply && "mt-4")}>
              <FormLabel>
                {isReply ? "Type your reply" : "Join the conversation"}
              </FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  className="h-auto"
                  placeholder={
                    isReply ? "Write your reply..." : "Write a comment..."
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="sm:w-auto w-full mt-4"
          disabled={isPending}
          type="submit"
        >
          {isReply ? "Reply" : "Post comment"}
        </Button>
      </form>
    </Form>
  );
};
