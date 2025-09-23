import { CardsDataset, CardProps, OfferProps } from "./card";

export type Txn = {
  amount: number;
  categories: string[];
  keywords?: string[];
};

const norm = (s: string) => s.toLowerCase();

async function loadCardsData() {
  const { default: data } = await import("@/data/cards.json");
  return data;
}

export async function searchByKeyword(q: string) {
  const needle = norm(q);
  const results: { card: CardProps; offer: OfferProps }[] = [];

  const data = await loadCardsData();

  for (const card of data.cards) {
    const allOffers = [...(card.offers || []), ...(card.other_benefits || [])];
    for (const offer of allOffers) {
      const hay = [
        card.name,
        card.issuer,
        offer.name,
        ...(offer.keywords || []),
        ...(offer.category || []),
      ]
        .map(norm)
        .join("|");
      if (hay.includes(needle)) {
        results.push({ card, offer });
      }
    }
  }
  return results;
}

export async function searchByCategory(categories: string[]) {
  const target = new Set(categories.map(norm));
  const results: { card: CardProps; offer: OfferProps }[] = [];

  const data = await loadCardsData();

  for (const card of data.cards) {
    const allOffers = [...(card.offers || []), ...(card.other_benefits || [])];
    for (const offer of allOffers) {
      if ((offer.category || []).some((c) => target.has(norm(c)))) {
        results.push({ card, offer });
      }
    }
  }
  return results;
}

export async function getAllCards() {
  const results: { card: CardProps; offer: OfferProps }[] = [];
  const data = await loadCardsData();

  for (const card of data.cards) {
    const allOffers = [...(card.offers || []), ...(card.other_benefits || [])];
    for (const offer of allOffers) {
      results.push({ card, offer });
    }
  }
  return results;
}

// Compute the best card+offer given a txn + your known Level for each card
export function bestCardFor(
  data: CardsDataset,
  txn: Txn,
  levelByCardId: Record<string, string> = {},
) {
  let best: null | {
    card: CardProps;
    offer: OfferProps;
    rate: number;
    reward: number;
  } = null;

  const catSet = new Set(txn.categories.map(norm));
  const kwSet = new Set((txn.keywords || []).map(norm));

  for (const card of data.cards) {
    const level = levelByCardId[card.cardId] || "";
    const allOffers = [...(card.offers || []), ...(card.other_benefits || [])];

    for (const offer of allOffers) {
      const catMatch = (offer.category || []).some((c) => catSet.has(norm(c)));
      const kwMatch = (offer.keywords || []).some((k) => kwSet.has(norm(k)));
      if (!catMatch && !kwMatch) continue;

      let rate = 0;
      if (offer.rate) {
        if (level && offer.rate[level] != null) rate = offer.rate[level];
        else {
          // fallback: max available
          const numericValues = Object.values(offer.rate).filter((val): val is number => 
  typeof val === 'number' && !isNaN(val)
);

// 確保至少有一個值，否則使用預設值 (例如 0)
rate = numericValues.length > 0 ? Math.max(...numericValues) : 0;
        }
      } else if ((offer as any).rate?.flat) {
        rate = (offer as any).rate.flat;
      } else if (card.general_rate) {
        rate = card.general_rate;
      }

      const reward = txn.amount * rate;
      if (!best || reward > best.reward) {
        best = { card, offer, rate, reward };
      }
    }

    // fallback to general rate if no offer matched for this card
    if (!best && card.general_rate) {
      const reward = txn.amount * card.general_rate;
      best = {
        card,
        offer: { id: "general", name: "一般消費", category: ["general"] },
        rate: card.general_rate,
        reward,
      };
    }
  }
  return best;
}
