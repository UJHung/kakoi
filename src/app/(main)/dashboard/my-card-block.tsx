import { MdAddCard } from "react-icons/md";
import Link from "next/link";

import { getMyCards } from "@/app/actions/cards";
import cardData from "@/data/cards.json";
import ImageLoader from "@/components/image-loader";

export default async function MyCardBlock() {
  const userCards = await getMyCards();
  const displayCards = userCards.map((userCard) => {
    const cardDetail = cardData.cards.find(
      (card) => card.cardId === userCard.cardId,
    );
    return cardDetail ? { ...userCard, ...cardDetail } : null;
  });

  if (displayCards.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">尚未新增任何信用卡</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {displayCards.map((card) => {
        if (!card) return null;
        return (
          <div key={card.cardId}>
            <ImageLoader
              src={card.cardImage}
              alt={`${card.issuer} ${card.name}`}
              width={120}
              height={75}
              className="w-full rounded-md object-contain"
            />
          </div>
        );
      })}

      <Link
        href="/cards"
        className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-dashed text-gray-400 hover:bg-gray-50"
      >
        <MdAddCard size="24" />
        新增卡片
      </Link>
    </div>
  );
}
