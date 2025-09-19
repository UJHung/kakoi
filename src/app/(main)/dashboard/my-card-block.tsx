import { MdAddCard } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { RiSettingsFill } from "react-icons/ri";
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
      <div className="flex w-full flex-col items-center gap-3 rounded-md bg-orange-500/10 px-4 py-4 text-center text-orange-500">
        <HiSpeakerphone size="24" />
        在開始使用前，請先新增至少一張信用卡
        <Link
          href="/cards"
          className="w-full rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-500/80"
        >
          新增卡片
        </Link>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-3 gap-4 md:grid-cols-4">
      {displayCards.map((card) => {
        if (!card) return null;
        return (
          <div key={card.cardId}>
            <ImageLoader
              src={card.cardImage}
              alt={`${card.issuer} ${card.name}`}
              width={180}
              height={110}
              className="w-full rounded-lg border object-contain"
            />
          </div>
        );
      })}

      <Link
        href="/cards"
        className="hidden h-full w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed bg-white text-gray-400 hover:bg-gray-50 md:flex"
      >
        <MdAddCard size="24" />
        新增卡片
      </Link>

      <Link
        href="/cards"
        className="absolute -top-12 -right-0 rounded-md bg-black p-2 text-white md:block"
      >
        <RiSettingsFill size="16" />
      </Link>
    </div>
  );
}
