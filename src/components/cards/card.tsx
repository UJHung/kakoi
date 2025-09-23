"use client";

import { Badge } from "@/components/ui/badge";
import ImageLoader from "@/components/common/image-loader";
import { useCardDetail } from "@/hooks/use-cards";
import { cn } from "@/lib/utils/utils";
import Dropdown from "./dropdown-menu";

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
    return <div />;
  }

  if (!card) return null;

  return (
    <CardContainer
      className={className}
      card={card}
      isDisplayOnly={isDisplayOnly}
      onRefresh={onRefresh}
    />
  );
}

const CardContainer = ({
  className,
  card,
  isDisplayOnly,
  onRefresh,
}: {
  className?: string;
  card: any;
  isDisplayOnly?: boolean;
  onRefresh?: () => void;
}) => {
  return (
    <div className={cn("relative rounded-xl bg-white p-4 sm:p-5", className)}>
      <div className="grid gap-3 sm:grid-cols-5 sm:gap-6">
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
            id={card.cardId}
            linkSwitch={card?.links?.switch}
            linkOffer={card?.links?.offer}
            onRefresh={onRefresh}
          />
        </div>
      )}
    </div>
  );
};
