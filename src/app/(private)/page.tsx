import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { fetchGroupsByUser } from "@/data/fetch-groups-by-user-id";
import { unauthorized } from "next/navigation";
import { GroupCard } from "../../components/group-card";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return unauthorized();

  const groups = await fetchGroupsByUser(userId);

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 justify-center h-full">
        <h1 className="font-bold text-6xl sm:text-8xl text-center">
          My Santas
        </h1>
        <p className="text-muted-foreground text-lg text-center">
          You are not part of any groups yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto px-4 gap-8 max-w-screen-lg w-full">
      <h1 className="font-bold text-8xl">My Santas</h1>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
