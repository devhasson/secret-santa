import { auth } from "@/auth";
import { fetchGroupsByUser } from "@/data/fetch-groups-by-user-id";
import { unauthorized } from "next/navigation";

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
    <div className="fllex flex-col mx-auto px-4 max-w-screen-lg w-full">
      <h1 className="font-bold text-3xl">My Santas</h1>
      {groups.map((group) => (
        <div key={group.id} className="border p-4 my-4 rounded-md">
          <h2 className="font-bold text-xl capitalize">{group.name}</h2>
          <p className="text-muted-foreground text-sm">{group.bio}</p>
        </div>
      ))}
    </div>
  );
}
