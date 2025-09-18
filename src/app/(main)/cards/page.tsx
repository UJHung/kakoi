import { TbCreditCard } from "react-icons/tb";
import { revalidatePath } from "next/cache";

import { getMyCards } from "@/app/actions/cards";
import { CardDTO } from "@/app/types/card";
import Card from "@/components/cards/card";
import CreateCardDialog from "./create-card-dialog";

export default async function CardsPage() {
  const cards = await getMyCards();

  async function refreshCards() {
    "use server";
    revalidatePath("/cards");
  }

  console.log(cards);

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">我的卡片</h1>
        <CreateCardDialog onCardCreated={refreshCards} size="icon" />
      </div>

      {cards.length === 0 && (
        <div className="rounded-xl bg-gray-50 py-12 text-center">
          <TbCreditCard size="36" className="inline-block" />
          <p className="py-3">還沒有卡片，先新增一張吧！</p>
          <CreateCardDialog onCardCreated={refreshCards} />
        </div>
      )}

      <div className="grid gap-4">
        {cards.map((card: CardDTO) => (
          <Card
            key={card.id}
            id={card.id}
            isDisplayOnly
            onRefresh={refreshCards}
          />
        ))}
      </div>
    </div>
  );
}
