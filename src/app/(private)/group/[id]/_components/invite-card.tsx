import { Badge } from "@/components/ui/badge";
import { Invite } from "@prisma/client";
import { addDays, formatDistance } from "date-fns";

interface InviteCardProps {
  invite: Pick<Invite, "invitedEmail" | "createdAt" | "status">;
}

export function InviteCard({ invite }: InviteCardProps) {
  const initialLetters =
    invite.invitedEmail[0].toUpperCase() + invite.invitedEmail[1].toUpperCase();

  const expiresAt = addDays(invite.createdAt, 7);

  return (
    <div
      key={invite.invitedEmail}
      className="flex items-center justify-between gap-2 bg-secondary p-2 rounded-2xl shadow-lg group"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full w-4 h-4 flex justify-center items-center p-4">
          {initialLetters}
        </span>
        <div className="flex flex-col overflow-hidden">
          <p className="max-w-40 xs:max-w-60 truncate">{invite.invitedEmail}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {invite.status === "REJECTED" && "Rejected"}
              {addDays(invite.createdAt, 7) < new Date()
                ? "Expired"
                : "Expires in " + formatDistance(expiresAt, new Date())}
            </span>
          </div>
        </div>
      </div>
      <Badge className="overflow-hidden w-0 p-0 capitalize rounded-xl transition-all duration-200 group-hover:w-fit group-hover:px-2.5 group-hover:py-0.5">
        {invite.status === "REJECTED"
          ? "Rejected"
          : addDays(invite.createdAt, 7) < new Date()
            ? "Expired"
            : "Pending"}
      </Badge>
    </div>
  );
}
