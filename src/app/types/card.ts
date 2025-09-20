import type { UserCard } from "@prisma/client";
import CardData from "@/data/cards.json";

// cards.json 中的 offer 結構
export type CardOfferProps = {
  id: string;
  name?: string;
  category: string[]; // 餐飲、海外、網購...
  rate?: Record<string, number>; // 回饋率，例如 { general: 1, bonus: 2 }
  calc_rules?: Record<string, any>;
  keywords?: string[]; // 關鍵字
  note?: string; // 備註
  exclusions?: Array<{
    path_name: string;
    contents: string[];
  }>;
};

// 為了向後兼容，保留舊的名稱
export type OfferProps = CardOfferProps;

export type CardProps = {
  cardId: string;
  cardImage?: string;
  issuer: string;
  name: string;
  period?: { start?: string; end?: string };
  points?: { unit: string };
  levels?: Record<string, { desc?: string; max_rate?: number } | undefined>;
  offers: CardOfferProps[]; // 使用 cards.json 中的 offer 結構
  other_benefits?: CardOfferProps[]; // 使用 cards.json 中的 offer 結構
  general_rate?: number;
  remarks?: string[];
  links?: { offer?: string; switch?: string };
  switch?: {
    required: boolean;
    anchor_local: string;
    timezone: string;
    applies_to_local: string[];
    unit: string;
    effective: string;
  };
};

interface CategoryProps {
  slug: string;
  name: string;
}

export type CardsDataset = {
  schema_version: string;
  generated_at?: string;
  categories: CategoryProps[];
  cards: CardProps[];
};

export type CardDTO = UserCard & { offers?: OfferProps[] };

// 僅用戶個人化資訊（對應新的 UserCard schema）
export type MyCardProps = {
  id: string; // UserCard.id
  cardId: string; // UserCard.cardId，對應 cards.json 中的 card.id
  nickname?: string; // 使用者自訂別名
  last4?: string; // 卡號後四碼
  createdAt?: Date; // 新增時間
  meta?: any; // 使用者個人化設定
};

// 完整的用戶卡片資訊（MyCardProps + CardProps）
export type UserCardWithDetails = MyCardProps & {
  issuer: string; // 從 cards.json 取得
  name: string; // 從 cards.json 取得
  cardImage?: string; // 從 cards.json 取得
  period?: { start?: string; end?: string };
  points?: { unit: string };
  levels?: Record<string, { desc?: string; max_rate?: number } | undefined>;
  offers: OfferProps[];
  other_benefits?: OfferProps[];
  general_rate?: number;
  remarks?: string[];
  links?: { offer?: string; switch?: string };
  switch?: {
    required: boolean;
    anchor_local: string;
    timezone: string;
    applies_to_local: string[];
    unit: string;
    effective: string;
  };
};

export type CardPresetProps = {
  id: string; // 用於 server action 辨識
  issuer: string; // 發卡行
  name: string; // 卡名
  tags?: string[]; // 顯示用（若你有 meta，可放 meta 裡）
  cardImage?: string; // 卡片圖片 URL
  description?: string; // 簡短介紹
  notes?: string[]; // 額外說明
  createdAt?: Date; // 新增時間
};

export function getCardInfo(cardId: string): CardProps | undefined {
  return CardData.cards.find((card) => card.cardId === cardId);
}

// 組合用戶卡片和卡片詳細資訊
export function getUserCardWithDetails(
  userCard: MyCardProps,
): UserCardWithDetails | null {
  const cardInfo = getCardInfo(userCard.cardId);
  if (!cardInfo) {
    return null;
  }

  return {
    ...userCard,
    issuer: cardInfo.issuer,
    name: cardInfo.name,
    cardImage: cardInfo.cardImage,
    period: cardInfo.period,
    points: cardInfo.points,
    levels: cardInfo.levels,
    offers: cardInfo.offers,
    other_benefits: cardInfo.other_benefits,
    general_rate: cardInfo.general_rate,
    remarks: cardInfo.remarks,
    links: cardInfo.links,
    switch: cardInfo.switch,
  };
}
