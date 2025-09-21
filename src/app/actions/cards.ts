"use server";

import { getOrCreateGuestProfile } from "@/lib/db/profile";
import { prisma } from "@/lib/db/prisma";

export async function addCard(data: {
  cardId: string;
  nickname?: string;
  last4?: string;
}) {
  const profile = await getOrCreateGuestProfile();

  try {
    const card = await prisma.userCard.create({
      data: {
        cardId: data.cardId,
        nickname: data.nickname,
        last4: data.last4,
        profileId: profile.id,
      },
    });

    // 重新驗證相關頁面
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard");
    revalidatePath("/cards");

    return card;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
}

export async function getMyCards() {
  const profile = await getOrCreateGuestProfile();
  if (!profile) {
    throw new Error("尚未登入");
  }

  try {
    const cards = await prisma.userCard.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return cards;
  } catch (error) {
    console.error("Error getting user cards:", error);
    throw error;
  }
}

export async function deleteCard(id: string) {
  try {
    const profile = await getOrCreateGuestProfile();

    // 刪除卡片（使用 cardId 欄位進行匹配）
    const result = await prisma.userCard.deleteMany({
      where: { cardId: id, profileId: profile.id },
    });

    if (result.count === 0) {
      throw new Error("找不到要刪除的卡片或沒有權限刪除");
    }

    // 重新驗證相關頁面
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard");
    revalidatePath("/cards");

    return { success: true };
  } catch (error) {
    console.error("刪除卡片時發生錯誤:", error);
    throw error;
  }
}
