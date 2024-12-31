"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Prisma } from "@prisma/client";
import { ViewProfileForm } from "../_forms/view-profile-form";

interface ViewProfileDialogProps {
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

export function ViewProfileDialog({
  participant,
  open,
  onOpenChange,
}: ViewProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>View Profile</DialogTitle>
        </DialogHeader>
        <ViewProfileForm
          participant={participant}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}
