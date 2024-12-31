"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Prisma } from "@prisma/client";
import { EllipsisVertical, Shield, Trash, User } from "lucide-react";
import { ViewProfileDialog } from "./_dialogs/view-profile-dialog";
import { RemoveParticipantDialog } from "./_dialogs/remove-participant-dialog";

interface ParticipantAdminOptionsDropdownMenuProps {
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
}

export function ParticipantAdminOptionsDropdownMenu({
  participant,
}: ParticipantAdminOptionsDropdownMenuProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const [isViewProfileOpen, setIsViewProfileOpen] = React.useState(false);
  const [isMakeAdminOpen, setIsMakeAdminOpen] = React.useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = React.useState(false);

  const dropdownTriggerRef = React.useRef<HTMLButtonElement>(null);
  const focusRef = React.useRef<HTMLElement | null>(null);

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleCloseDialog() {
    setDropdownOpen(false);
  }

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button ref={dropdownTriggerRef} variant="link">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64"
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuLabel className="text-muted-foreground text-sm font-semibold">
            Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                handleDialogItemSelect();
                setIsViewProfileOpen(true);
              }}
            >
              <User size={16} />
              View profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            {participant.role !== "OWNER" && (
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  handleDialogItemSelect();
                  setIsMakeAdminOpen(true);
                }}
              >
                <Shield size={16} />
                Make admin
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          {participant.role !== "OWNER" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  handleDialogItemSelect();
                  setIsRemoveOpen(true);
                }}
              >
                <Trash size={16} />
                Remove
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewProfileDialog
        participant={participant}
        open={isViewProfileOpen}
        onOpenChange={(open) => {
          setIsViewProfileOpen(open);
          if (!open) handleCloseDialog();
        }}
      />

      <RemoveParticipantDialog
        participant={participant}
        open={isRemoveOpen}
        onOpenChange={(open) => {
          setIsRemoveOpen(open);
          if (!open) handleCloseDialog();
        }}
      />
    </>
  );
}
