import { MdAddCard } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { RiSettingsFill } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";

import Link from "next/link";

import { getMyCards } from "@/app/actions/cards";
import cardData from "@/data/cards.json";
import ImageLoader from "@/components/common/image-loader";

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
      <Link
        href="/cards"
        className="block rounded-lg bg-orange-500 px-4 py-4 text-white transition-colors sm:px-5"
      >
        <div className="flex items-center justify-between gap-2 text-center sm:gap-3">
          請先新增一張信用卡
          <div className="flex items-center gap-x-1 rounded-md bg-white px-2 py-2 font-semibold text-orange-500 sm:px-4">
            <span className="hidden sm:block">新增</span>
            <HiPlus size="16" className="sm:hidden" />
          </div>
        </div>
      </Link>
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
