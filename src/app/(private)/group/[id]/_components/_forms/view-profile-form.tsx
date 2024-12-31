"use client";

import { useActionState, useEffect } from "react";
import { Prisma } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/loading";
import { toast } from "sonner";

import { updateParticipantNickname } from "../../_actions/update-participant-nickname";

interface ViewProfileFormProps {
  participant: Prisma.ParticipantGetPayload<{
    include: {
      user: {
        select: {
          email: true;
          name: true;
          image: true;
        };
      };
    };
  }>;
  onOpenChange: (open: boolean) => void;
}

const initialState = { errors: {}, message: "" };

export function ViewProfileForm({
  onOpenChange,
  participant,
}: ViewProfileFormProps) {
  const [state, dispatch, pending] = useActionState(
    updateParticipantNickname,
    initialState
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      state.message = "";
      onOpenChange(false);
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, onOpenChange]);

  return (
    <form action={dispatch} className="flex flex-col gap-6">
      <Input
        className="hidden"
        readOnly
        name="participant_id"
        value={participant.id}
      />
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-5 items-center gap-2">
          <Label htmlFor="participant_email">Email:</Label>
          <Input
            className="col-span-4"
            disabled
            readOnly
            name="participant_email"
            value={participant.user.email}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-5 gap-2 items-center">
          <Label htmlFor="participant_nickname">Nickname:</Label>
          <Input
            className={`col-span-4 ${state.errors?.participantNickname ? "border-red-700" : ""}`}
            name="participant_nickname"
            defaultValue={participant.nickname || ""}
            placeholder="Type a nickname for this participant"
          />
        </div>
        {state?.errors?.participantNickname &&
          state.errors.participantNickname.map((error) => (
            <p key={error} aria-live="polite" className="text-red-700 text-xs">
              {error}
            </p>
          ))}
      </div>
      <div className="flex items-center gap-3 justify-end flex-wrap">
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Fechar
        </Button>
        <Button disabled={pending} type="submit" className="min-w-32">
          {pending ? <Loading /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
