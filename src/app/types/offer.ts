// types/offer.ts
export type Offer = {
  id: string;
  title: string;
  description?: string;
  category: string; // 餐飲、海外、網購...
  baseRate: number; // 基礎回饋 %
  bonusRate?: number; // 加碼回饋 %
  startDate?: Date | null;
  endDate?: Date | null;
  source?: string; // 活動來源網址
};

export type Card = {
  id: string;
  issuer: string;
  productName: string;
  nickname?: string;
  last4?: string;
  createdAt: Date;

  offers?: Offer[]; // 這裡就是一張卡可以有多個優惠
};
