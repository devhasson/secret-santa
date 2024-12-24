import { Group } from "@prisma/client";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      href={`/group/${group.id}`}
      className="border p-6 flex flex-col gap-4 rounded-lg shadow-lg duration-100 ease-in-out hover:bg-muted-foreground/5 group"
    >
      <div className="flex flex-wrap justify-between items-center sm:gap-1">
        <h2 className="font-bold text-xl text-nowrap text-ellipsis">
          {group.name}
        </h2>
        {group.date && (
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-red-500" />
            <span className="text-nowrap text-muted-foreground text-sm">
              {format(group.date, "PPP")}
            </span>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm">{group.bio}</p>
      <ArrowRight
        size={24}
        className="self-end ease-in-out duration-150 group-hover:translate-x-3"
      />
    </Link>
  );
}
