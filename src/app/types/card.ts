import { getCardInfo } from "@/lib/utils/card-data";

// cards.json 中的 offer 結構
export type CardOfferProps = {
  id: string;
  name?: string;
  category: string[]; // 餐飲、海外、網購...
  rate?: {
    [key: string]: number | undefined;
  } | {
    SIMPLE?: number;
    EXCHANGE?: number;
    BONUS?: number;
    NEW?: number;
    LEVEL_1?: number;
    LEVEL_2?: number;
    LEVEL_3?: number;
    VIP?: number;
  }; // 回饋率，例如 { general: 1, bonus: 2 }
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


// cards.json 中的 card 結構
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
    anchor_local?: string;
    timezone?: string;
    applies_to_local?: string[];
    unit?: string;
    effective?: string;
  };
};

// cards.json 中的 category 結構
interface CategoryProps {
  slug: string;
  name: string;
}

// 整個 cards.json 結構
export type CardsDataset = {
  schema_version: string;
  generated_at?: string;
  categories: CategoryProps[];
  cards: CardProps[];
};

// 用於新增卡片的資料結構
export type CardDTO = {
  cardId: string;
  nickname?: string;
  cardType?: 'VISA' | 'MASTERCARD' | 'JCB' | 'AMEX' | 'UNIONPAY' | 'OTHER';
  cardLevel?: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'VIP' | 'OTHER';
  expiryDate?: string; // ISO date string
  billingDay?: number; // 1-31，每月結賬日
}

// 僅用戶個人化資訊（對應新的 UserCard schema）
export type MyCardProps = {
  id: string; // UserCard.id
  cardId: string; // UserCard.cardId，對應 cards.json 中的 card.id
  nickname?: string; // 使用者自訂別名
  createdAt?: Date; // 新增時間
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
    anchor_local?: string;
    timezone?: string;
    applies_to_local?: string[];
    unit?: string;
    effective?: string;
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

// 組合用戶卡片和卡片詳細資訊
export async function getUserCardWithDetails(
  userCard: MyCardProps,
): Promise<UserCardWithDetails | null> {
  const cardInfo = await getCardInfo(userCard.cardId);
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
