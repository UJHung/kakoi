import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

async function getRequestPrisma() {
  return new PrismaClient();
}

export async function getOrCreateGuestProfile() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  console.debug("guestId from cookie:", guestId);

  if (!guestId) {
    throw new Error("guestId not found - middleware should have set it");
  }

  // 為這個請求創建一個獨立的 Prisma 客戶端
  const requestPrisma = await getRequestPrisma();

  try {
    // 使用原始 SQL 查詢來避免 prepared statement 衝突
    const profiles = await requestPrisma.$queryRaw`
      SELECT id, type::text, "createdAt" FROM "Profile" WHERE id = ${guestId}
    `;

    // 如果找到配置檔，則返回它
    if (profiles && Array.isArray(profiles) && profiles.length > 0) {
      return profiles[0];
    }

    // 如果找不到配置檔，則創建一個新的
    const newProfile = await requestPrisma.profile.create({
      data: { id: guestId, type: "GUEST" },
    });

    return newProfile;
  } finally {
    // 確保斷開連接，釋放資源
    await requestPrisma.$disconnect();
  }
}
