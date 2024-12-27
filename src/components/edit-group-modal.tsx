"use client";

import { FetchGroupByIdWithParticipantsAndInvites } from "@/data/fetch-group-by-id-with-participants-and-invites";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { EditGroupForm } from "./edit-group-form";
import { useState } from "react";

interface EditGroupModalProps {
  group: FetchGroupByIdWithParticipantsAndInvites;
}

export function EditGroupModal({ group }: EditGroupModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 hover:text-muted-foreground">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogDescription>
            Here you can edit the group details.
          </DialogDescription>
        </DialogHeader>
        <EditGroupForm group={group} setOpenDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
