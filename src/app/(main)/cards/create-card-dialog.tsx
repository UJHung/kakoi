"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Card from "@/components/cards/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addCard, getMyCards } from "@/app/actions/cards";
import { CardProps, CardDTO } from "@/app/types/card";
import data from "@/data/cards.json";

interface CreateCardDialogProps {
  size?: "default" | "icon";
  onCardCreated: () => void;
}

export default function CreateCardDialog({
  size = "default",
  onCardCreated,
}: CreateCardDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myCards, setMyCards] = useState<CardDTO[]>([]);
  const { watch, handleSubmit, setValue, reset } = useForm<CardDTO>();

  // 將 fetchMyCards 提取為獨立函數
  const fetchMyCards = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const cards = (await getMyCards()) as CardDTO[];
      setMyCards(cards);
    } catch (error) {
      console.error("Error fetching my cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(data: CardDTO) {
    try {
      await addCard({
        cardId: data.cardId,
        nickname: data.nickname,
      });

      // 新增成功後立即更新本地卡片列表
      await fetchMyCards();

      setIsOpen(false);
      reset();
      onCardCreated();
      toast.success("新增成功");
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error("新增失敗，請重試");
    }
  }

  const selectPreset = (card: CardProps) => {
    setValue("cardId", card.cardId);
  };

  useEffect(() => {
    if (isOpen) {
      fetchMyCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={size}>
          {size == "default" ? "新增卡片" : <HiPlus />}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom fixed top-auto right-0 bottom-0 left-1/2 mx-0 my-0 h-[85vh] max-w-full -translate-x-1/2 translate-y-0 rounded-t-xl rounded-b-none border-b-0 duration-200 ease-out"
        showCloseButton={false}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between space-y-4"
        >
          <div className="flex-col space-y-4">
            <DialogTitle>新增卡片</DialogTitle>
            <h3 className="text-sm font-medium">選擇卡片</h3>
            {isLoading ? (
              <div className="relative animate-pulse">
                <div className="sm:-p-5 grid gap-4 rounded-xl border p-4 sm:grid-cols-5 sm:gap-6">
                  <div className="h-40 rounded-xl bg-gray-100 sm:col-span-2"></div>
                  <div className="space-y-3 sm:col-span-3">
                    <div className="h-6 w-3/4 rounded-md bg-gray-100"></div>
                    <div className="h-4 w-1/2 rounded-md bg-gray-100"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-h-[62vh] overflow-y-auto pr-2 pb-2">
                {data.cards.length > 0 && (
                  <div className="space-y-2">
                    <div className="grid gap-4">
                      {data.cards
                        .filter(
                          (card) =>
                            !myCards.some(
                              (myCard) => myCard.cardId === card.cardId,
                            ),
                        )
                        .map((card, index) => (
                          <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => selectPreset(card)}
                          >
                            <Card
                              id={card.cardId}
                              className={
                                watch("cardId") === card.cardId
                                  ? "border-2 border-black"
                                  : "border border-gray-200"
                              }
                            />
                          </div>
                        ))}

                      {data.cards.filter(
                        (card) =>
                          !myCards.some(
                            (myCard) => myCard.cardId === card.cardId,
                          ),
                      ).length === 0 && (
                        <div className="py-8 text-center text-sm text-gray-400">
                          目前沒有可新增的卡片
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="grid gap-3">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={!watch("cardId")}
            >
              確認
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              size="lg"
              onClick={() => {
                setIsOpen(false);
                reset();
              }}
            >
              取消
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
