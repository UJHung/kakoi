// app/actions/cards.ts
"use server";

import { prisma } from "@/lib/prisma";
import { getOrCreateGuestProfile } from "@/lib/profile";

export async function createUserCard(data: {
  issuer: string;
  productName: string;
  nickname?: string;
  last4?: string;
}) {
  const profile = await getOrCreateGuestProfile();
  const card = await prisma.userCard.create({
    data: { ...data, profileId: profile.id },
  });
  return card;
}

export async function getMyCards() {
  const profile = await getOrCreateGuestProfile();
  return prisma.userCard.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteCard(id: string) {
  const profile = await getOrCreateGuestProfile();
  // 防護：只能刪自己的
  await prisma.userCard.deleteMany({
    where: { id, profileId: profile.id },
  });
}
