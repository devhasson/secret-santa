import { CreateGroupForm } from "./_components/create-group-form";
import { SessionProvider } from "next-auth/react";

export default function Page() {
  return (
    <div className="flex flex-col mx-auto w-full px-4 py-12 max-w-screen-lg min-h-[calc(100vh-9rem)]">
      <SessionProvider>
        <CreateGroupForm />
      </SessionProvider>
    </div>
  );
}
