// app/actions/cards.ts
"use server";

import { prisma } from "@/lib/prisma";
import { getOrCreateGuestProfile } from "@/lib/profile";

export async function createUserCard(data: {
  cardId: string;
  nickname?: string;
  last4?: string;
}) {
  const profile = await getOrCreateGuestProfile();
  const card = await prisma.userCard.create({
    data: {
      cardId: data.cardId,
      nickname: data.nickname,
      last4: data.last4,
      profileId: profile.id,
    },
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
  try {
    const profile = await getOrCreateGuestProfile();
    // 防護：只能刪自己的
    const result = await prisma.userCard.deleteMany({
      where: { cardId: id, profileId: profile.id },
    });

    if (result.count === 0) {
      throw new Error("找不到要刪除的卡片或沒有權限刪除");
    }

    return { success: true };
  } catch (error) {
    console.error("刪除卡片時發生錯誤:", error);
    throw error;
  }
}
