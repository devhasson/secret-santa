import { formatDate } from "date-fns";
import { ParticipantAdminOptionsDropdownMenu } from "./participant-admin-options-dropdown-menu";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ParticipantCardProps {
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
  isOwner: boolean;
}

export function ParticipantCard({
  participant,
  isOwner,
}: ParticipantCardProps) {
  const initialLetters = participant.user.email[0] + participant.user.email[1];
  return (
    <div
      key={participant.id}
      className="flex items-center justify-between gap-2 bg-secondary p-2 rounded-2xl shadow-lg group"
    >
      <div className="flex items-center gap-2">
        <Avatar>
          {participant.user.image && (
            <AvatarImage src={participant.user.image} />
          )}
          <AvatarFallback className="uppercase">
            {initialLetters}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <p>
            {participant.nickname
              ? participant.nickname
              : participant.user.email}
          </p>
          <div className="text-xs text-muted-foreground flex flex-col sm:flex-row gap-0.5">
            <strong className="capitalize font-semibold">
              {participant.role.toLowerCase()}
            </strong>
            <span className="hidden sm:block"> &middot; </span>
            <span>
              Since{" "}
              {formatDate(new Date(participant.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      </div>
      {isOwner && (
        <ParticipantAdminOptionsDropdownMenu participant={participant} />
      )}
    </div>
  );
}
