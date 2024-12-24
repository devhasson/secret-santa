import { FetchGroupByIdWithParticipantsAndInvites } from "@/data/fetch-group-by-id-with-participants-and-invites";
import { InviteCard } from "./invite-card";

interface InvitesSectionProps {
  group: FetchGroupByIdWithParticipantsAndInvites;
}

export function InvitesSection({ group }: InvitesSectionProps) {
  return (
    <div className="flex flex-col gap-4 xs:col-span-2 md:col-span-1">
      <h2 className="text-4xl font-bold">Invites</h2>
      <div className="flex flex-col gap-4 max-h-96 overflow-y-auto no-scrollbar">
        {group.invites.map((invite) => (
          <InviteCard key={invite.invitedEmail} invite={invite} />
        ))}
      </div>
    </div>
  );
}
