"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { forbidden, unauthorized } from "next/navigation";
import { z } from "zod";

const editGroupDataSchema = z.object({
  groupId: z.string().cuid({ message: "Group ID is required." }),
  groupName: z
    .string({ message: "Group name is required." })
    .min(1, { message: "Group name must at least 1 character." })
    .max(40, { message: "Group name must have a maximum of 40 characters." }),
  groupBio: z
    .string()
    .max(600, { message: "Group bio must have a maximum of 600 characters." })
    .optional()
    .nullable(),
  groupDate: z.string().optional().nullable(),
});

type State = {
  errors?: {
    groupId?: string[];
    groupName?: string[];
    groupBio?: string[];
    groupDate?: string[];
  };
  message?: string;
  succcess?: boolean;
};

export async function editGroupData(_previousState: State, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return unauthorized();
  }

  const validatedData = editGroupDataSchema.safeParse({
    groupId: formData.get("group_id"),
    groupName: formData.get("group_name"),
    groupBio: formData.get("group_bio"),
    groupDate: formData.get("group_date"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Please, fill in the fields correctly",
    };
  }

  const { groupId, groupName, groupBio, groupDate } = validatedData.data;

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
      ownerId: userId,
    },
  });

  if (!group) {
    return forbidden();
  }

  const parsedDate = groupDate ? new Date(groupDate) : null;

  try {
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        name: groupName,
        bio: groupBio || "",
        ...(groupDate && { date: parsedDate }),
      },
    });

    revalidatePath("/groups");

    return {
      message: "🎉 Your group was edited successfuly!",
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      message:
        "An error occurred while trying to edit the group. Please, try again later.",
      success: false,
    };
  }
}
