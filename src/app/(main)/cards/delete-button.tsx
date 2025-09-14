"use client";

import { useTransition } from "react";
import { deleteCard } from "@/app/actions/cards";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await deleteCard(id);
          location.reload();
        })
      }
    >
      {pending ? "刪除中..." : "刪除"}
    </Button>
  );
}
