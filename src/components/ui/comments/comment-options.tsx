"use client";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Text from "../text";
import { CreateCommentForm } from "../../forms/create-comment-form";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { deleteCommentAction } from "@/app/_actions/comment.actions";
import { ConfirmDialog } from "../confirm-dialog";

type Props = {
  authorId: string;
  commentId: number;
  postId: number;
};

/** Reply and delete options. */
export const CommentOptions = ({ commentId, postId, authorId }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { slug } = useParams();
  const router = useRouter();

  const [deleting, startDeleting] = useTransition();

  const { userId } = useAuth();
  const userIsAuthor = !!userId && userId === authorId;

  const onClickDelete = () =>
    startDeleting(async () => {
      await deleteCommentAction({
        idToDelete: commentId,
        postSlug: slug,
      });

      router.push(pathname, { scroll: false });
    });

  const currentlyReplyingTo = searchParams.get("replyingTo");
  const showReplyForm = currentlyReplyingTo === String(commentId);

  const getOnClickHref = () => {
    // if reply form is showing and user clicks, hide it
    if (showReplyForm) return pathname;

    return `${pathname}?replyingTo=${commentId}`;
  };

  const onClickHref = getOnClickHref();

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Link href={onClickHref} scroll={false}>
          <Text variant="mutedText" className="underline mt-2">
            {showReplyForm ? "Stop replying" : "Reply"}
          </Text>
        </Link>

        {userIsAuthor && (
          <ConfirmDialog
            loading={deleting}
            onClickDelete={onClickDelete}
            confirmButtonMessage="Delete comment"
            title="Are you sure you want to delete this comment?"
            description="This action is permanent. This will delete your comment and all replies below."
            trigger={
              <Text
                role="button"
                variant="mutedText"
                className="underline mt-2"
              >
                Delete
              </Text>
            }
          />
        )}
      </div>

      {showReplyForm && (
        <CreateCommentForm slug={slug} postId={postId} parentId={commentId} />
      )}
    </div>
  );
};