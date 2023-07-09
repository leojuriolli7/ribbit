"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EditPostInput,
  editPostSchema,
} from "@/lib/validations/post.schema";
import { useTransition } from "react";
import { editPostAction } from "@/app/_actions/post.actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
};

export const EditPostForm = ({ title, description }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { slug } = useParams();
  const pathname = usePathname();
  const { userId } = useAuth();
  const router = useRouter();

  const methods = useForm<EditPostInput>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      description,
      title,
      slug,
      userId: userId as string,
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (values: EditPostInput) => {
    startTransition(async () => {
      await editPostAction(values);
    });
    router.push(pathname);
  };

  return (
    <Form {...methods}>
      <form className="sm:w-64 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} placeholder="Write a title..." />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Description</FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea {...field} placeholder="Write a description..." />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex mt-4 items-center gap-2">
          <Link className="w-1/2" href={pathname}>
            <Button
              className="w-full"
              disabled={isPending}
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
          </Link>

          <Button
            className="w-1/2"
            disabled={isPending}
            variant="brand"
            type="submit"
          >
            Update post
          </Button>
        </div>
      </form>
    </Form>
  );
};
