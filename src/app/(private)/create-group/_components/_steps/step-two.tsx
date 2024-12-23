import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateGroupStepStore } from "../../_providers/create-group-steps-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

import { z } from "zod";
import { Plus, X } from "lucide-react";
import { useQueryState } from "nuqs";
<<<<<<< HEAD

import { stepVariants } from "@/utils/step-variants";
import { participantVariants } from "@/utils/participant-variants";
import { useCreateGroupStepStore } from "../../_providers/create-group-steps-provider";
=======
import { Badge } from "@/components/ui/badge";
>>>>>>> parent of 8ea0040 (feat: integrate framer-motion for animated transitions in group creation steps)

const stepTwoSchema = z.object({
  participantEmail: z
    .string()
    .email({ message: "You have to type a valid e-mail address" }),
});

interface ErrorState {
  participantEmail?: string[];
}

export function StepTwo() {
  const { step, incrementStep, decrementStep } = useCreateGroupStepStore(
    (state) => state
  );

  const [errors, setErrors] = useState<ErrorState>({});
  const [participantEmail, setParticipantEmail] = useQueryState("");
  const [participants, setParticipants] = useState<string[]>([]);

  function addParticipant() {
    const { success, errors, message } = validateSchema();

    if (!success) {
      if (errors) {
        setErrors(errors);
      }

      return toast.error(message);
    }

    setParticipants((participants) => [
      ...participants,
      participantEmail || "",
    ]);

    setErrors({});
    setParticipantEmail("");
  }

  function removeParticipant(participant: string) {
    setParticipants((participants) =>
      participants.filter((p) => p !== participant)
    );
  }

  function validateSchema() {
    try {
      stepTwoSchema.parse({
        participantEmail,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          errors: error.flatten().fieldErrors,
          message: "Please, fill in the fields correctly",
          success: false,
        };
      }

      return {
        message: "Something went wrong. Please, try again later.",
        success: false,
      };
    }

    return { success: true };
  }

  function handleContinue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (step !== 2) {
      return incrementStep();
    }

    if (participants.length === 0) {
      return toast.error("You have to add at least one participant");
    }
  }

  return (
    <div className={`${step === 2 ? "flex" : "hidden"} flex-col gap-6`}>
      {participants.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {participants.map((participant) => (
            <motion.button
              key={participant}
              variants={participantVariants}
              initial="hidden"
              animate="visible"
              exit="removed"
              onClick={() => removeParticipant(participant)}
              className="flex items-center gap-2"
            >
              <Badge className="rounded-xl">
                <span className="max-w-96 overflow-hidden text-ellipsis">
                  {participant}
                </span>
                <X size={12} />
              </Badge>
            </motion.button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="participant_email">E-mail</Label>
        <div className="flex items-center gap-2">
          <Input
            value={participantEmail || ""}
            onChange={(e) => setParticipantEmail(e.target.value)}
            name="participant_email"
            className={`${errors.participantEmail ? "border-red-700 " : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addParticipant();
              }
            }}
            placeholder="Enter the e-mail of the participant"
          />
          <Button onClick={addParticipant} type="button" variant="outline">
            <Plus />
          </Button>
        </div>
        {errors?.participantEmail &&
          errors.participantEmail.map((error) => (
            <p key={error} aria-live="polite" className="text-red-700 text-xs">
              {error}
            </p>
          ))}
      </div>

      <div className="flex items-center gap-2 justify-end">
        <Button
          onClick={decrementStep}
          type="button"
          variant="outline"
          className="w-fit"
        >
          Return
        </Button>
        <Button
          type="submit"
          onClick={(e) => handleContinue(e)}
          className="max-w-40 w-full"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
