import { CardDTO } from "@/app/types/card";

export function cacheCard(card: CardDTO) {
  localStorage.setItem(
    `kaku.card.${card.cardId}`,
    JSON.stringify({ t: Date.now(), card }),
  );
}

export function cacheCards(cards: CardDTO[]) {
  localStorage.setItem("kaku.cards", JSON.stringify({ t: Date.now(), cards }));
}
export function readCardsCache() {
  try {
    return JSON.parse(localStorage.getItem("kaku.cards") || "{}");
  } catch {
    return {};
  }
}
