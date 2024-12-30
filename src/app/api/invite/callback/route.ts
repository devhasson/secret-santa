"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenId = req.nextUrl.searchParams.get("token");

  if (!tokenId) {
    return NextResponse.json({ error: "Token is required." }, { status: 404 });
  }

  const invite = await prisma.invite.findUnique({ where: { id: tokenId } });

  if (!invite) {
    return NextResponse.json(
      { error: "Token is invalid. Please provide a valid token." },
      { status: 404 }
    );
  }

  const inviteExpiresAt = addDays(invite.createdAt, 7);
  const pendingInvite = invite.status === "PENDING";

  if (inviteExpiresAt < new Date() || !pendingInvite) {
    return NextResponse.json(
      { error: "The invite is not valid anymore." },
      { status: 401 }
    );
  }

  let user = await prisma.user.findUnique({
    where: { email: invite.invitedEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email: invite.invitedEmail },
    });
  }

  try {
    await prisma.$transaction([
      prisma.invite.update({
        where: { id: tokenId },
        data: { status: "ACCEPTED" },
      }),
      prisma.participant.create({
        data: {
          groupId: invite.groupId,
          userId: user.id,
          role: invite.role,
        },
      }),
    ]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while accepting the invite." },
      { status: 500 }
    );
  }

  await signIn("credentials", {
    email: user.email,
    token: tokenId,
  });
}
