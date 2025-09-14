import Link from "next/link";

import { getMyCards } from "@/app/actions/cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardDTO } from "@/app/types/card";

import DeleteButton from "./delete-button";

export default async function CardsPage() {
  const cards = await getMyCards();

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">我的卡片</h1>
        <Link href="/cards/new">
          <Button>新增卡片</Button>
        </Link>
      </div>

      {cards.length === 0 && (
        <p className="text-muted-foreground">還沒有卡片，先新增一張吧！</p>
      )}

      <div className="grid gap-4">
        {cards.map((c: CardDTO) => (
          <Card key={c.id} className="relative">
            <CardHeader className="pr-16">
              <CardTitle>
                {c.issuer} {c.productName}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>別名：{c.nickname ?? "未設定"}</p>
              <p>卡號後四碼：{c.last4 ?? "--"}</p>
            </CardContent>
            <div className="absolute top-4 right-4">
              <DeleteButton id={c.id} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
