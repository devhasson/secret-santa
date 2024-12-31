"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unauthorized } from "next/navigation";
import { z } from "zod";

const updateParticipantNicknameSchema = z.object({
  participantId: z.string(),
  participantNickname: z
    .string({ message: "The nickname is required" })
    .min(1, { message: "The nickname must have at least 1 character" })
    .max(64, { message: "The nickname must have a maximum of 64 characters" })
    .transform((value) => value.trim()),
});

type State = {
  errors?: {
    participantId?: string[];
    participantNickname?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function updateParticipantNickname(
  _prevState: State,
  formData: FormData
) {
  const session = await auth();
  const ownerId = session?.user.id;

  if (!ownerId) {
    return unauthorized();
  }

  const validatedData = updateParticipantNicknameSchema.safeParse({
    participantId: formData.get("participant_id"),
    participantNickname: formData.get("participant_nickname"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly",
    };
  }

  const { participantId, participantNickname } = validatedData.data;

  const participant = await prisma.participant.findFirst({
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
      message: "Participant not found, please provide a valid participant",
      success: false,
    };
  }

  if (participant.group.ownerId !== ownerId) {
    return unauthorized();
  }

  if (participant.nickname === participantNickname) {
    return {
      success: false,
      message: "The participant nickname is already the same",
    };
  }

  const participantNicknameExists = await prisma.participant.findFirst({
    where: {
      groupId: participant.groupId,
      nickname: participantNickname,
    },
  });

  if (participantNicknameExists) {
    return {
      success: false,
      message: "The participant nickname already exists in the group",
    };
  }

  try {
    await prisma.participant.update({
      where: {
        id: participantId,
      },
      data: {
        nickname: participantNickname,
      },
    });

    revalidatePath("/group");

    return {
      success: true,
      message: "🎉 Participant nickname updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "An error occurred while updating the participant nickname",
    };
  }
}
