import { useCreateGroupStepStore } from "../_providers/create-group-steps-provider";

export function FormHeader() {
  const { step } = useCreateGroupStepStore((state) => state);

  return (
    <header className="flex flex-col gap-2">
      <h1 className="font-bold text-3xl">
        {step === 1 ? "Create a group" : "Invite your Friends"}
      </h1>
      <p className="text-muted-foreground">
        {step === 1
          ? "Create a group with your friends and start sharing your favorite content."
          : "Invite your friends to join the group. You can invite them later too."}
      </p>
    </header>
  );
}
