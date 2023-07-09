"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

type Props = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  confirmButtonMessage: string;
  onClickDelete: () => void;
  loading: boolean;
};

export const ConfirmDialog = ({
  title,
  trigger,
  description = "This action is permanent and cannot be undone.",
  confirmButtonMessage,
  onClickDelete,
  loading,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle> {title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex sm:flex-row flex-col gap-2 justify-end">
            <DialogTrigger>
              <Button
                className="w-full sm:w-auto"
                disabled={loading}
                type="button"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              className="w-full sm:w-auto"
              disabled={loading}
              variant="destructive"
              onClick={onClickDelete}
            >
              {confirmButtonMessage}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
