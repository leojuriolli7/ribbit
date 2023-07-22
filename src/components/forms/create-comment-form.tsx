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
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  slug: string;
  postId: number;
  parentId?: number;
};

export const CreateCommentForm = ({ postId, slug, parentId }: Props) => {
  const { user, isSignedIn } = useUser();
  const userId = user?.publicMetadata.databaseId;

  const [isCreatingComment, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const isReply = !!parentId;

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: undefined,
      userId,
      postId,
      slug,
      parentId,
    },
  });

  const { control, handleSubmit, setValue } = methods;
  const signedInTitle = isReply ? "Type your reply" : "Join the conversation";
  const signedOutTitle = "Login to post a comment!";
  const signedOutButtonMessage = "Can't comment while logged out";
  const signedInButtonMesage = isReply ? "Reply" : "Post comment";

  const onSubmit = (values: CreateCommentInput) => {
    startTransition(async () => {
      await createCommentAction(values);

      setValue("text", "");
      router.replace(pathname, { scroll: false });
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
                {isSignedIn ? signedInTitle : signedOutTitle}
              </FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  disabled={!isSignedIn}
                  className="h-auto"
                  placeholder={
                    isReply ? "Write your reply..." : "Write a comment..."
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex mt-4 items-center gap-2">
          {isReply && (
            <Link className="w-1/2" href={pathname} scroll={false} replace>
              <Button
                className="w-full"
                disabled={isCreatingComment || !isSignedIn}
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
            </Link>
          )}

          <Button
            className={cn(isReply ? "w-1/2" : "sm:w-auto w-full")}
            disabled={isCreatingComment || !isSignedIn}
            type="submit"
          >
            {isSignedIn ? signedInButtonMesage : signedOutButtonMessage}
          </Button>
        </div>
      </form>
    </Form>
  );
};
