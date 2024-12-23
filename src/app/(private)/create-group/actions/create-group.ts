"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { emailQueue } from "@/workers/email.worker";
import { unauthorized } from "next/navigation";
import { z } from "zod";

const createGroupSchema = z.object({
  groupName: z
    .string({ message: "Group name is required." })
    .min(1, { message: "Group name must at least 1 character." })
    .max(40, { message: "Group name must have a maximum of 40 characters." }),
  groupBio: z
    .string()
    .max(60, { message: "Group bio must have a maximum of 60 characters." })
    .optional()
    .nullable(),
  groupDate: z.string().optional().nullable(),
  participantsEmail: z
    .array(z.string().email({ message: "You must provide a valid email." }))
    .min(1, { message: "At least one participant is required" }),
});

type State = {
  errors?: {
    groupName?: string[];
    groupBio?: string[];
    groupDate?: string[];
    participantsEmail?: string[];
  };
  message?: string;
  succcess?: boolean;
};

export async function createGroup(_prevState: State, formData: FormData) {
  const session = await auth();
  const ownerId = session?.user?.id;
  const ownerEmail = session?.user?.email;

  if (!ownerId || !ownerEmail) {
    unauthorized();
  }

  const validatedData = createGroupSchema.safeParse({
    groupName: formData.get("group_name"),
    groupBio: formData.get("group_bio"),
    groupDate: formData.get("group_date"),
    participantsEmail: formData.getAll("participant_email"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly",
    };
  }

  const { groupName, groupBio, groupDate, participantsEmail } =
    validatedData.data;

  if (participantsEmail.includes(ownerEmail)) {
    return {
      message: "You can't invite yourself to the group",
      success: false,
    };
  }

  try {
    const group = await prisma.group.create({
      data: {
        name: groupName,
        bio: groupBio,
        date: groupDate ? new Date(groupDate) : undefined,
        ownerId,
        participants: {
          create: {
            role: "OWNER",
            userId: ownerId,
          },
        },
      },
    });

    const invites = await prisma.invite.createManyAndReturn({
      data: [
        ...participantsEmail.map((email) => ({
          invitedEmail: email,
          groupId: group.id,
        })),
      ],
      select: {
        id: true,
        invitedEmail: true,
        groupId: true,
      },
    });

    participantsEmail.map(async (email) => {
      const invite = invites.find(
        (item) => item.invitedEmail === email && item.groupId === group.id
      );

      if (!invite) {
        return;
      }

      await emailQueue.add("invite-user", {
        email,
        subject: `Join ${groupName} on Secret Santa`,
        groupName,
        invitedByEmail: ownerEmail,
        inviteLink: `${process.env.ORIGIN_URL}/api/invite/callback?token=${invite.id}`,
      });
    });

    return {
      message: "🎉 Group created successfully!",
      success: true,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
}
