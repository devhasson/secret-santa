"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useCreateGroupStepStore } from "../../_providers/create-group-steps-provider";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import { z } from "zod";

const stepOneSchema = z.object({
  groupName: z.string({ message: "Group name is required" }).nonempty(),
  groupDescription: z.string().optional().nullable(),
});

interface ErrorState {
  groupName?: string[];
  groupDescription?: string[];
}

export function StepOne() {
  const { step, incrementStep } = useCreateGroupStepStore((state) => state);

  const [errors, setErrors] = useState<ErrorState>({});

  const [groupName, setGroupName] = useQueryState("group_name");
  const [groupDescription, setGroupDescription] =
    useQueryState("group_description");

  function validateSchema() {
    try {
      stepOneSchema.parse({
        groupName,
        groupDescription,
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

    const { success, errors, message } = validateSchema();

    if (!success) {
      if (errors) {
        setErrors(errors);
      }

      return toast.error(message);
    }

    setErrors({});
    incrementStep();
  }

  return (
    <div className={`${step === 1 ? "flex" : "hidden"} flex-col gap-6`}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="group_name">Group Name</Label>
        <Input
          name="group_name"
          value={groupName || ""}
          onChange={(e) => setGroupName(e.target.value)}
          className={`${errors.groupName ? "border-red-700 " : ""}`}
          placeholder="Type the name of the santa group"
        />
        {errors?.groupName &&
          errors.groupName.map((error) => (
            <p key={error} aria-live="polite" className="text-red-700 text-xs">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="group_description">Description</Label>
        <Textarea
          name="group_description"
          value={groupDescription || ""}
          onChange={(e) => setGroupDescription(e.target.value)}
          className={`${errors.groupDescription ? "border-red-700" : ""}`}
          placeholder="Enter a description for the group"
        />
        {errors?.groupDescription &&
          errors.groupDescription.map((error) => (
            <p key={error} aria-live="polite" className="text-red-700 text-xs">
              {error}
            </p>
          ))}
      </div>

      <div className="flex items-center justify-end">
        <Button
          onClick={(e) => handleContinue(e)}
          type="button"
          className="max-w-40 w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
