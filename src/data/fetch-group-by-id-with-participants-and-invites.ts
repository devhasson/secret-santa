"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface FetchGroupByIdWithParticipantsAndInvites
  extends Prisma.GroupGetPayload<{
    include: {
      invites: {
        select: {
          invitedEmail: true;
          status: true;
          createdAt: true;
        };
      };
      participants: {
        include: {
          user: {
            select: {
              email: true;
              name: true;
              image: true;
            };
          };
        };
      };
    };
  }> {}

export async function fetchGroupByIdWithParticipantsAndInvites(id: string) {
  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      invites: {
        select: {
          invitedEmail: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      participants: {
        include: {
          user: {
            select: {
              email: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return group;
}
