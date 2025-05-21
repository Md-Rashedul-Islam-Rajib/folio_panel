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

interface Skill {
  id: string;
  name: string;
  icon: string[];
  category: string;
}

interface DeleteSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill;
  onConfirm: () => void;
}

export function DeleteSkillDialog({
  open,
  onOpenChange,
  skill,
  onConfirm,
}: DeleteSkillDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this technology?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            technology &quot;{skill.name}&quot; and remove it from our
            servers.
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
