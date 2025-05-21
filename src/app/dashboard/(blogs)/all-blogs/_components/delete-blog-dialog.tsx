"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage: string[];
  createdAt: string;
}

interface DeleteBlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: Blog;
  onConfirm: () => void;
}

export function DeleteBlogDialog({
  open,
  onOpenChange,
  blog,
  onConfirm,
}: DeleteBlogDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the blog
            post &quot;{blog.title}&quot; and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
