import type { CardProps } from "@/app/types/card";

// 記憶體緩存
const cardInfoCache = new Map<string, CardProps>();

export async function getCardInfo(
  cardId: string,
): Promise<CardProps | undefined> {
  // 先檢查緩存
  if (cardInfoCache.has(cardId)) {
    return cardInfoCache.get(cardId);
  }

  const { default: cardData } = await import("@/data/cards.json");

  // 查找卡片
  const card = cardData.cards.find((card: CardProps) => card.cardId === cardId);
  if (card) {
    cardInfoCache.set(cardId, card);
  }

  return card;
}

export async function getCategories() {
  const { default: cardData } = await import("@/data/cards.json");
  return cardData.categories;
}
