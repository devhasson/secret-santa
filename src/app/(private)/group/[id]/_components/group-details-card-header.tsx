import { FetchGroupByIdWithParticipantsAndInvites } from "@/data/fetch-group-by-id-with-participants-and-invites";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface GroupDetailsCardHeaderProps {
  group: FetchGroupByIdWithParticipantsAndInvites;
}

export function GroupDetailsCardHeader({ group }: GroupDetailsCardHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-4xl">{group.name}</h2>
      {group.date ? (
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-red-500" />
          <span className="text-nowrap text-muted-foreground text-sm">
            {format(group.date, "PPP")}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Calendar size={12} className="text-red-500" />
          <span className="text-nowrap text-muted-foreground text-sm">
            No date set
          </span>
        </div>
      )}
      <p className="text-sm text-muted-foreground">{group.bio}</p>
    </div>
  );
}
