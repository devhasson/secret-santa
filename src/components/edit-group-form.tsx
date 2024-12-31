"use client";

import { FetchGroupByIdWithParticipantsAndInvites } from "@/data/fetch-group-by-id-with-participants-and-invites";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePicker } from "./date-picker";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useActionState, useCallback, useEffect } from "react";
import { editGroupData } from "@/app/(private)/group/[id]/_actions/edit-group-data";
import { Loading } from "./loading";
import { toast } from "sonner";

interface EditGroupFormProps {
  group: FetchGroupByIdWithParticipantsAndInvites;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = { errors: {}, message: "" };

export function EditGroupForm({ group, setOpenDialog }: EditGroupFormProps) {
  const handleCloseDialog = useCallback(
    () => setOpenDialog(false),
    [setOpenDialog]
  );

  const [state, dispatch, pending] = useActionState(
    editGroupData,
    initialState
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
      handleCloseDialog();
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, handleCloseDialog]);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <input type="hidden" name="group_id" readOnly value={group.id} />
      <div className="grid grid-cols-2 gap-2 items-center">
        <div className="flex flex-col gap-2">
          <Label htmlFor="group_name">Group Name *</Label>
          <Input
            name="group_name"
            defaultValue={group.name}
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
          <DatePicker name="group_date" defaultDate={group.date} />
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
        <Label htmlFor="group_bio">Description</Label>
        <Textarea
          name="group_bio"
          defaultValue={group.bio || ""}
          className="min-h-32"
          placeholder="Enter a description for the group"
        />
        {state?.errors?.groupBio &&
          state.errors.groupBio.map((error) => (
            <p key={error} aria-live="polite" className="text-red-700 text-xs">
              {error}
            </p>
          ))}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={handleCloseDialog}
        >
          Cancel
        </Button>
        <Button type="submit" className="w-fit" disabled={pending}>
          {pending ? <Loading /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
