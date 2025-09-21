"use server";

import { getOrCreateGuestProfile } from "@/lib/db/profile";
import { PrismaClient } from "@prisma/client";

export async function createUserCard(data: {
  cardId: string;
  nickname?: string;
  last4?: string;
}) {
  const profile = await getOrCreateGuestProfile();

  // 為每個請求創建獨立的 Prisma 客戶端
  const requestPrisma = new PrismaClient();

  try {
    const card = await requestPrisma.userCard.create({
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
  } finally {
    await requestPrisma.$disconnect();
  }
}

export async function getMyCards() {
  const profile = await getOrCreateGuestProfile();
  if (!profile) {
    throw new Error("尚未登入");
  }

  // 為這個請求創建獨立的 Prisma 實例
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

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
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteCard(id: string) {
  try {
    const profile = await getOrCreateGuestProfile();

    // 為每個請求創建獨立的 Prisma 客戶端
    const requestPrisma = new PrismaClient();

    try {
      // 刪除卡片（使用 cardId 欄位進行匹配）
      const result = await requestPrisma.userCard.deleteMany({
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
    } finally {
      // 確保斷開連接，釋放資源
      await requestPrisma.$disconnect();
    }
  } catch (error) {
    console.error("刪除卡片時發生錯誤:", error);
    throw error;
  }
}
