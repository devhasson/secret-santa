"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { RemoveParticipantForm } from "../_forms/remove-participant-form";

interface RemoveParticipantDialogProps {
  participant: Prisma.ParticipantGetPayload<{
    include: {
      user: {
        select: {
          email: true;
          name: true;
          image: true;
        };
      };
    };
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveParticipantDialog({
  participant,
  open,
  onOpenChange,
}: RemoveParticipantDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove User</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            {participant.nickname
              ? participant.nickname
              : participant.user.email}{" "}
            from the group?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <RemoveParticipantForm
            participantId={participant.id}
            onOpenChange={onOpenChange}
          />
        </DialogFooter>

        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
