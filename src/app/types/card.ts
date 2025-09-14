import type { UserCard, Offer } from "@prisma/client";

export type CardDTO = UserCard & { offers?: Offer[] };

export type Card = {
  id: string;
  issuer: string; // 發卡行，例如「台新銀行」
  productName: string; // 卡片名稱，例如「Richart 卡」
  nickname?: string; // 使用者自己取的別名
  last4?: string; // 卡號後四碼
  createdAt: Date;
};
