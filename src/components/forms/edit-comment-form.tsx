"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EditCommentInput,
  editCommentSchema,
} from "@/lib/validations/comment.schema";
import { useTransition } from "react";
import { editCommentAction } from "@/app/_actions/comment.actions";
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
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  slug: string;
  text: string;
  commentId: number;
};

export const EditCommentForm = ({ text, slug, commentId }: Props) => {
  const [isUpdating, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<EditCommentInput>({
    resolver: zodResolver(editCommentSchema),
    defaultValues: {
      text,
      slug,
      commentId,
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (values: EditCommentInput) => {
    startTransition(async () => {
      await editCommentAction(values);

      router.push(pathname, { scroll: false });
    });
  };

  return (
    <Form {...methods}>
      <form
        className="sm:w-64 w-full mt-4 mb-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit your comment</FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  className="h-auto"
                  placeholder="Edit your comment..."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Link className="w-1/2" href={pathname} scroll={false}>
            <Button
              className="w-full mt-4"
              variant="outline"
              disabled={isUpdating}
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Button className="w-1/2 mt-4" disabled={isUpdating} type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};
