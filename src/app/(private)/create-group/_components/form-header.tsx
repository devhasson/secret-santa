import { useCreateGroupStepStore } from "../_providers/create-group-steps-provider";

export function FormHeader() {
  const { step } = useCreateGroupStepStore((state) => state);

  return (
    <header className="flex flex-col gap-2">
      <h1 className="font-bold text-3xl">
        {step === 1
          ? "Create a group"
          : step === 2
          ? "Invite your Friends"
          : ""}
      </h1>
      <p className="text-muted-foreground">
        {step === 1
          ? "Create a group to start chatting"
          : step === 2
          ? "Invite your friends to join the group"
          : ""}
      </p>
    </header>
  );
}
