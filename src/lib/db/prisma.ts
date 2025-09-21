import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// 確保在開發中使用相同實例
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 注意：使用此方法時，請確保在伺服器端元件中明智地使用 Prisma
// 避免在單個請求中多次創建臨時連接
