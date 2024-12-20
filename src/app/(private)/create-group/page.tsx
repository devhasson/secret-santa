import { CreateGroupForm } from "./_components/create-group-form";
import { CreateGroupStepsStoreProvider } from "./_providers/create-group-steps-provider";

export default function Page() {
  return (
    <div className="flex flex-col mx-auto w-full px-4 py-12 max-w-screen-lg min-h-[calc(100vh-9rem)]">
      <CreateGroupStepsStoreProvider>
        <CreateGroupForm />
      </CreateGroupStepsStoreProvider>
    </div>
  );
}
