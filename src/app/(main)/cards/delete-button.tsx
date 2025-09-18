"use client";

import { toast } from "sonner";

import { deleteCard } from "@/app/actions/cards";

export default function DeleteButton({
  id,
  onRefresh,
}: {
  id: string;
  onRefresh: () => void;
}) {
  return (
    <div
      className="flex items-center gap-1 text-red-500"
      onClick={() => async () => {
        await deleteCard(id);
        onRefresh();
        toast.success("刪除成功");
      }}
    >
      刪除卡片
    </div>
  );
}
