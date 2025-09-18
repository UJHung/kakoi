import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { getCardInfo } from "@/app/types/card";

import DeleteButton from "@/app/(main)/cards/delete-button";
import { Badge } from "@/components/ui/badge";
import ImageLoader from "@/components/image-loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Card({
  id,
  className,
  isDisplayOnly = false,
  onRefresh,
}: {
  id: string;
  className?: string;
  isDisplayOnly?: boolean;
  onRefresh?: () => void;
}) {
  const card = getCardInfo(id);
  if (!card) return null;

  return (
    <div className={cn("relative rounded-xl bg-white p-4", className)}>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2">
          <ImageLoader
            src={card.cardImage || "/cards/default-card.png"}
            alt={`${card.issuer} ${card.name}`}
            width={400}
            height={252}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="col-span-3">
          {card.switch?.required && isDisplayOnly && (
            <Badge className="mb-1" variant="sky">
              需切換
            </Badge>
          )}
          <div className="text-lg font-semibold">{card.name}</div>
          <div className="text-gray-500">{card.issuer}</div>

          <ul className="mt-3 list-['·_'] space-y-1 pl-3 text-xs text-gray-600">
            {card.remarks &&
              card.remarks.map((remark, index) => (
                <li key={index}>{remark}</li>
              ))}
            {card.switch?.required && (
              <li>
                回饋方案以當日{card.switch.anchor_local}
                記錄於銀行之回饋方案，計算當日零時起之逐筆交易回饋
              </li>
            )}
          </ul>
        </div>
      </div>
      {isDisplayOnly && (
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer rounded-md border p-2 hover:bg-gray-100">
              <FiMoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {card?.links?.offer && (
                <Link href={card?.links?.offer} target="_blank">
                  <DropdownMenuItem>查看詳情</DropdownMenuItem>
                </Link>
              )}
              {card?.links?.switch && (
                <Link href={card?.links?.switch} target="_blank">
                  <DropdownMenuItem>切換方案教學</DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {onRefresh && <DeleteButton id={id} onRefresh={onRefresh} />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
