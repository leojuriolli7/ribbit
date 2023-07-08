"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import {
  type CreatePostInput,
  createPostSchema,
} from "@/lib/validations/post.schema";
import { useTransition } from "react";
import { createPostAction } from "@/app/_actions/post.actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Text from "../ui/text";
import { Textarea } from "../ui/textarea";

export const CreatePostForm = () => {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: undefined,
      title: undefined,
    },
  });

  const { errors } = formState;

  const onSubmit = (values: CreatePostInput) => {
    startTransition(async () => {
      await createPostAction(values);
    });
  };

  return (
    <form className="w-64 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <Label>Title</Label>
      {errors?.title && (
        <Text as="p" className="text-red-500 my-1" variant="mutedText">
          {errors?.title?.message}
        </Text>
      )}
      <Input
        {...register("title")}
        placeholder="Write a title..."
        className="mb-2"
      />
      <Label>Description</Label>
      {errors?.description && (
        <Text as="p" className="text-red-500 my-1" variant="mutedText">
          {errors?.description?.message}
        </Text>
      )}
      <Textarea
        {...register("description")}
        placeholder="Write a description..."
        className="mb-4"
      />
      <Button disabled={isPending} type="submit">
        Create new post
      </Button>
    </form>
  );
};
