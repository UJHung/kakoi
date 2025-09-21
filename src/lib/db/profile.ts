import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";

export async function getOrCreateGuestProfile() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  console.debug("guestId from cookie:", guestId);

  if (!guestId) {
    throw new Error("guestId not found - middleware should have set it");
  }

  try {
    // 先嘗試使用標準 Prisma 查詢來查找配置檔
    const existingProfile = await prisma.profile.findUnique({
      where: { id: guestId },
    });

    // 如果找到配置檔，則返回它
    if (existingProfile) {
      return existingProfile;
    }

    // 如果找不到配置檔，則創建一個新的
    const newProfile = await prisma.profile.create({
      data: { id: guestId, type: "GUEST" },
    });

    return newProfile;
  } catch (error) {
    console.error("Error in getOrCreateGuestProfile:", error);
    throw error;
  }
}
