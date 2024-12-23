"use client";

import { useActionState, useEffect } from "react";
import { useQueryState } from "nuqs";

import { FormHeader } from "./form-header";
import { AddParticipants } from "./add-participants";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { createGroup } from "../actions/create-group";
import { redirect } from "next/navigation";

const initialState = { state: {}, message: "", success: false };

export function CreateGroupForm() {
  const [groupName, setGroupName] = useQueryState("group_name");
  const [groupBio, setGroupBio] = useQueryState("group_bio");

  const [state, dispatch, pending] = useActionState(createGroup, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message);
    }

    if (state.success && state.message) {
      toast.success(state.message);
      redirect("/");
    }
  }, [state]);

  return (
    <form
      action={dispatch}
      className="flex flex-col gap-10 border p-4 rounded-lg max-w-screen-md w-full mx-auto"
    >
      <FormHeader />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 sm:grid grid-cols-2 sm:gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="group_name">Group Name *</Label>
            <Input
              name="group_name"
              value={groupName || ""}
              onChange={(e) => setGroupName(e.target.value)}
              className={`${state?.errors?.groupName ? "border-red-700" : ""}`}
              placeholder="Type the name of the santa group"
            />
            {state?.errors?.groupName &&
              state.errors.groupName.map((error) => (
                <p
                  key={error}
                  aria-live="polite"
                  className="text-red-700 text-xs"
                >
                  {error}
                </p>
              ))}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="group_date">Date</Label>
            <DatePicker name="group_date" />
            {state?.errors?.groupDate &&
              state.errors.groupDate.map((error) => (
                <p
                  key={error}
                  aria-live="polite"
                  className="text-red-700 text-xs"
                >
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="group_description">Description</Label>
          <Textarea
            name="group_description"
            value={groupBio || ""}
            onChange={(e) => setGroupBio(e.target.value)}
            className={`${state?.errors?.groupBio ? "border-red-700" : ""}`}
            placeholder="Enter a description for the group"
          />
          {state?.errors?.groupBio &&
            state.errors.groupBio.map((error) => (
              <p
                key={error}
                aria-live="polite"
                className="text-red-700 text-xs"
              >
                {error}
              </p>
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <AddParticipants />
          {state?.errors?.participantsEmail &&
            state.errors.participantsEmail.map((error) => (
              <p
                key={error}
                aria-live="polite"
                className="text-red-700 text-xs"
              >
                {error}
              </p>
            ))}
        </div>
        <div className="flex justify-end items-center">
          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </div>
    </form>
  );
}
