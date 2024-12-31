import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Prisma } from "@prisma/client";
import { EllipsisVertical, Shield, Trash, User } from "lucide-react";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel className="text-muted-foreground text-sm font-semibold">
          Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User size={16} />
            View profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {participant.role !== "OWNER" && (
            <DropdownMenuItem>
              <Shield size={16} />
              Make admin
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {participant.role !== "OWNER" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash size={16} />
              Remove
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
