"use server";

import { prisma } from "@/lib/prisma";

export async function fetchGroupsByUser(userId: string) {
  const groups = await prisma.group.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
  });

  return groups;
}
