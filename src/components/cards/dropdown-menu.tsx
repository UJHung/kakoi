"use client";

import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";
import { toast } from "sonner";

import { deleteCard } from "@/app/actions/cards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dropdown({
  id,
  linkSwitch,
  linkOffer,
  onRefresh,
}: {
  id: string;
  linkSwitch?: string;
  linkOffer?: string;
  onRefresh?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-md border p-2 hover:bg-gray-100">
        <FiMoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {linkOffer && (
          <Link href={linkOffer} target="_blank">
            <DropdownMenuItem>查看詳情</DropdownMenuItem>
          </Link>
        )}
        {linkSwitch && (
          <Link href={linkSwitch} target="_blank">
            <DropdownMenuItem>切換方案教學</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            try {
              await deleteCard(id);
              onRefresh?.();
              toast.success("刪除成功");
            } catch (error) {
              console.error("刪除失敗:", error);
              toast.error(error instanceof Error ? error.message : "刪除失敗");
            }
          }}
        >
          刪除卡片
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
