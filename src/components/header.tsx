import Link from "next/link";
import { Gift, Plus, Users } from "lucide-react";
import { Button } from "./ui/button";

export async function Header() {
  return (
    <header className="p-4 border-b">
      <div className="flex items-center gap-2 justify-between max-w-screen-lg w-full mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Gift className="text-red-500" />
          <span className="text-nowrap">
            <strong>Secret</strong> Santa
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <Users />
              My Santas
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4"
          >
            <Link href="/create-group" className="flex gap-2 items-center">
              <Plus />
              New Group
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
