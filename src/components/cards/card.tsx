"use client";

import { cn } from "@/lib/utils/utils";

import { Badge } from "@/components/ui/badge";
import ImageLoader from "@/components/common/image-loader";
import Dropdown from "./dropdown-menu";
import { useCardDetail } from "@/hooks/use-cards";

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
  const { card, loading, error } = useCardDetail(id);
  if (loading) {
    return (
      <div
        className={cn(
          "relative animate-pulse rounded-xl bg-white p-5 sm:p-4",
          className,
        )}
      >
        <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
          <div className="h-40 rounded-xl bg-gray-100 sm:col-span-2"></div>
          <div className="space-y-3 sm:col-span-3">
            <div className="h-6 w-3/4 rounded-md bg-gray-100"></div>
            <div className="h-4 w-1/2 rounded-md bg-gray-100"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className={cn("relative rounded-xl bg-white p-5 sm:p-4", className)}>
      <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
        <div className="sm:col-span-2">
          <ImageLoader
            src={card.cardImage || "/cards/default-card.png"}
            alt={`${card.issuer} ${card.name}`}
            width={400}
            height={252}
            className="w-full rounded-xl border object-cover sm:rounded-lg"
          />
        </div>
        <div className="sm:col-span-3">
          {card.switch?.required && isDisplayOnly && (
            <Badge className="mb-1" variant="orange">
              需切換方案
            </Badge>
          )}
          <div className="text-lg font-semibold">{card.name}</div>
          <div className="text-gray-500">{card.issuer}</div>

          <ul className="mt-3 list-['·_'] space-y-1 pl-3 text-xs text-gray-600">
            {card.remarks &&
              card.remarks.map((remark, index) => (
                <li key={index}>{remark}</li>
              ))}
          </ul>
        </div>
      </div>
      {isDisplayOnly && (
        <div className="absolute top-8 right-8 sm:top-4 sm:right-4">
          <Dropdown
            id={id}
            linkSwitch={card?.links?.switch}
            linkOffer={card?.links?.offer}
            onRefresh={onRefresh}
          />
        </div>
      )}
    </div>
  );
}
