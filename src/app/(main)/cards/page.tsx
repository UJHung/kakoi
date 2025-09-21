import { TbCreditCard } from "react-icons/tb";
import { revalidatePath } from "next/cache";

import { getMyCards } from "@/app/actions/cards";
import Card from "@/components/cards/card";
import CreateCardDialog from "./create-card-dialog";

export default async function CardsPage() {
  const userCards = await getMyCards();

  async function refreshCards() {
    "use server";
    revalidatePath("/cards");
  }

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">我的卡片</h1>
        <CreateCardDialog onCardCreated={refreshCards} size="icon" />
      </div>

      {userCards.length === 0 && (
        <div className="rounded-xl bg-gray-50 py-12 text-center">
          <TbCreditCard size="36" className="inline-block" />
          <p className="py-3">還沒有卡片，先新增一張吧！</p>
          <CreateCardDialog onCardCreated={refreshCards} />
        </div>
      )}

      <div className="grid gap-4">
        {userCards.map((card) => (
          <Card
            key={card.id}
            id={card.cardId}
            isDisplayOnly
            onRefresh={refreshCards}
          />
        ))}
      </div>
    </div>
  );
}
