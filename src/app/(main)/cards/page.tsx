import { Suspense } from "react";
import { TbCreditCard } from "react-icons/tb";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

import { getMyCards } from "@/app/actions/cards";
import Card from "@/components/cards/card";
import { LoadingCard } from "@/components/common/loading-card";
import CreateCardDialog from "./create-card-dialog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "我的卡片",
};

export default async function Page() {
  async function refreshCards() {
    "use server";
    revalidatePath("/cards");
  }

  return (
    <div className="min-h-[90vh] space-y-5 p-5 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">我的卡片</h1>
        <CreateCardDialog onCardCreated={refreshCards} size="icon" />
      </div>
      <Suspense fallback={<LoadingCard />}>
        <MyCardList refreshCards={refreshCards} />
      </Suspense>
    </div>
  );
}

const MyCardList = async ({ refreshCards }) => {
  const userCards = await getMyCards();
  return (
    <>
      {userCards.length === 0 && (
        <div className="rounded-xl bg-gray-50 py-12 text-center">
          <TbCreditCard size="36" className="inline-block" />
          <p className="py-3">尚未新增任何卡片</p>
          <CreateCardDialog onCardCreated={refreshCards} />
        </div>
      )}

      <div className="grid gap-4">
        {userCards.map((card, index) => (
          <Card
            key={index}
            id={card.cardId}
            isDisplayOnly
            onRefresh={refreshCards}
          />
        ))}
      </div>
    </>
  );
};
