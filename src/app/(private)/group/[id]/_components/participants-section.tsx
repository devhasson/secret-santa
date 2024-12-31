import { FetchGroupByIdWithParticipantsAndInvites } from "@/data/fetch-group-by-id-with-participants-and-invites";
import { ParticipantCard } from "./participant-card";

interface ParticipantsSectionProps {
  group: FetchGroupByIdWithParticipantsAndInvites;
  isOwner: boolean;
}

export function ParticipantsSection({
  group,
  isOwner,
}: ParticipantsSectionProps) {
  const participants = group.participants;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Participants</h2>
      {participants.map((participant) => (
        <ParticipantCard
          key={participant.id}
          participant={participant}
          isOwner={isOwner}
        />
      ))}
    </div>
  );
}
