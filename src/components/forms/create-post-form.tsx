"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreatePostInput,
  createPostSchema,
} from "@/lib/validations/post.schema";
import { useTransition } from "react";
import { createPostAction } from "@/app/_actions/post.actions";
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
import { useAuth } from "@clerk/nextjs";

export const CreatePostForm = () => {
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: undefined,
      title: undefined,
      userId: userId as string,
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (values: CreatePostInput) => {
    startTransition(async () => {
      await createPostAction(values);
    });
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

        <Button
          className="sm:w-auto w-full mt-4"
          disabled={isPending}
          type="submit"
        >
          Create new post
        </Button>
      </form>
    </Form>
  );
};
