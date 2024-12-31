"use client";

import { useActionState, useEffect } from "react";
import { removeParticipant } from "../../_actions/remove-participant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";
import { toast } from "sonner";

interface RemoveParticipantFormProps {
  participantId: string;
  onOpenChange: (open: boolean) => void;
}

const initialState = { errors: {}, message: "" };

export function RemoveParticipantForm({
  participantId,
  onOpenChange,
}: RemoveParticipantFormProps) {
  const [state, dispatch, pending] = useActionState(
    removeParticipant,
    initialState
  );

  useEffect(() => {
    if (state.success && state.message) {
      onOpenChange(false);
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onOpenChange]);

  return (
    <form action={dispatch}>
      <Input
        readOnly
        value={participantId}
        className="hidden"
        name="participant_id"
      />
      <Button type="submit" disabled={pending}>
        {pending ? <Loading /> : "Remove"}
      </Button>
    </form>
  );
}
