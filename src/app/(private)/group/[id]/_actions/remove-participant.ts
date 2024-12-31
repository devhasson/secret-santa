"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unauthorized } from "next/navigation";
import { z } from "zod";

const removeParticipantSchema = z.object({
  participantId: z.string().cuid(),
});

type State = {
  errors?: {
    participantId?: string[];
  };
  message?: string;
  succcess?: boolean;
};

export async function removeParticipant(_prevState: State, formData: FormData) {
  const session = await auth();
  const ownerId = session?.user.id;

  if (!ownerId) {
    return unauthorized();
  }

  const validatedData = removeParticipantSchema.safeParse({
    participantId: formData.get("participant_id"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please, provide a valid participant id",
    };
  }

  const { participantId } = validatedData.data;

  const participant = await prisma.participant.findUnique({
    where: {
      id: participantId,
    },
    include: {
      group: {
        select: {
          ownerId: true,
        },
      },
    },
  });

  if (!participant) {
    return {
      message: "Please, provide a valid participant id",
      success: false,
    };
  }

  if (participant.userId === ownerId) {
    return {
      message: "You can't remove yourself from the group",
      success: false,
    };
  }

  if (participant.group.ownerId !== ownerId) {
    return unauthorized();
  }

  try {
    await prisma.participant.delete({
      where: {
        id: participantId,
      },
    });

    revalidatePath("/group");

    return {
      message: `🎉 ${participant.nickname ? participant.nickname : "The participant"} was removed successfully`,
      success: true,
    };
  } catch {
    return {
      message: "An error occurred while removing the participant",
      success: false,
    };
  }
}
