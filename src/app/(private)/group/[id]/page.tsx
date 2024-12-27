import { auth } from "@/auth";
import { GroupDetailsCardHeader } from "./_components/group-details-card-header";

import { fetchGroupByIdWithParticipantsAndInvites } from "@/data/fetch-group-by-id-with-participants-and-invites";
import { NotFoundGroup } from "./_components/not-found-group";
import { InvitesSection } from "./_components/invites-section";

interface ParamsProps {
  id: string;
}

export default async function Page({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const { id } = await params;
  const group = await fetchGroupByIdWithParticipantsAndInvites(id);

  const participant = group?.participants.find(
    (participant) => participant.userId === userId
  );

  if (!group || !participant) {
    return <NotFoundGroup />;
  }

  const isOwner = participant.role === "OWNER";

  return (
    <div className="flex flex-col mx-auto px-4 gap-8 max-w-screen-lg w-full">
      <div className="xs:grid xs:grid-cols-3 md:grid-cols-2 flex flex-col border rounded-lg shadow-lg p-8 gap-8">
        <GroupDetailsCardHeader group={group} isOwner={isOwner} />
        <InvitesSection group={group} />
      </div>
    </div>
  );
}
