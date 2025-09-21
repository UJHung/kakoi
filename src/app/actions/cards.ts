"use server";

import { getOrCreateGuestProfile } from "@/lib/profile";
import { withCache, invalidateCache } from "@/lib/cache";
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

    // 當新增卡片時，失效相關緩存
    invalidateCache(`user_cards:${profile.id}`);

    // 重新驗證儀表板頁面，確保它顯示最新資料
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard");

    return card;
  } finally {
    await requestPrisma.$disconnect();
  }
}

export async function getMyCards() {
  const profile = await getOrCreateGuestProfile();

  // 使用緩存包裝查詢
  return withCache(
    `user_cards:${profile.id}`,
    async () => {
      // 為每個請求創建獨立的 Prisma 客戶端，避免 prepared statement 衝突
      const requestPrisma = new PrismaClient();

      try {
        // 使用原始 SQL 查詢來避免 prepared statement 問題
        const results = await requestPrisma.$queryRaw`
          SELECT id, "cardId", nickname, last4, "createdAt"
          FROM "UserCard" 
          WHERE "profileId" = ${profile.id}
          ORDER BY "createdAt" DESC
        `;

        return Array.isArray(results) ? results : [];
      } finally {
        // 確保斷開連接，釋放資源
        await requestPrisma.$disconnect();
      }
    },
    // 緩存 5 分鐘
    5 * 60 * 1000,
  );
}

export async function deleteCard(id: string) {
  try {
    const profile = await getOrCreateGuestProfile();

    // 為每個請求創建獨立的 Prisma 客戶端
    const requestPrisma = new PrismaClient();

    try {
      // 防護：只能刪自己的
      const result = await requestPrisma.userCard.deleteMany({
        where: { cardId: id, profileId: profile.id },
      });

      if (result.count === 0) {
        throw new Error("找不到要刪除的卡片或沒有權限刪除");
      }

      // 當刪除卡片時，失效相關緩存
      invalidateCache(`user_cards:${profile.id}`);

      // 重新驗證儀表板頁面，確保它顯示最新資料
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/dashboard");

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
