"use client";

import { useState, useMemo, Suspense } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { RiPokerHeartsFill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import ImageLoader from "@/components/common/image-loader";
import LoadingCard from "@/components/common/loading-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExclusionDialog from "@/app/(main)/offers/exclusion-dialog";
import FilterBar from "@/app/(main)/dashboard/filter-bar";
import { useOffers } from "@/hooks/use-offers";
import { useDisclosure } from "@/hooks/use-disclosure";

export default function OffersList() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q");
  const categorySlug = sp.get("category");

  // Switch 狀態 - 預設只顯示我的卡片
  const [showMyCardsOnly, setShowMyCardsOnly] = useState(true);
  const [switchLoading, setSwitchLoading] = useState(false);

  // 使用自定義 hook 獲取優惠資料
  const { results, loading, error, selectedCategory } = useOffers(
    q || undefined,
    categorySlug || undefined,
  );

  // Switch 切換處理函數
  const handleSwitchChange = async (checked: boolean) => {
    setSwitchLoading(true);

    // 500ms 延遲
    await new Promise((resolve) => setTimeout(resolve, 300));

    setShowMyCardsOnly(checked);
    setSwitchLoading(false);
  };

  // 根據 Switch 狀態過濾結果
  const filteredResults = useMemo(() => {
    if (showMyCardsOnly) {
      return results.filter((result) => result.userOwned);
    }
    return results;
  }, [results, showMyCardsOnly]);

  // 組合 loading 狀態
  const isLoading = loading || switchLoading;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{q || selectedCategory?.name}</h2>
        <div className="flex cursor-pointer items-center space-x-2">
          <Switch
            id="my-cards"
            checked={showMyCardsOnly}
            onCheckedChange={handleSwitchChange}
            disabled={isLoading}
          />
          <Label
            htmlFor="my-cards"
            className={switchLoading ? "opacity-50" : ""}
          >
            僅顯示我的卡片
          </Label>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4">
          <LoadingCard />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="mt-4">
              <LoadingCard />
            </div>
          }
        >
          <ul className="mt-3 space-y-3">
            {filteredResults.map((r, i) => (
              <Card
                key={i}
                card={r.card}
                offer={r.offer}
                userOwned={r.userOwned && !showMyCardsOnly}
              />
            ))}
            {filteredResults.length === 0 && (
              <div className="pt-8 text-center text-sm">
                <BiSearchAlt size="24" className="mb-2 inline" />
                <div>{showMyCardsOnly ? "您尚未擁有相關卡片" : "尚無結果"}</div>
              </div>
            )}
            <div className="text-center">
              <Button
                size="lg"
                className="mt-4"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                返回首頁
              </Button>
            </div>
          </ul>
        </Suspense>
      )}
    </div>
  );
}

const Card = ({
  card,
  offer,
  userOwned,
}: {
  card: any;
  offer: any;
  userOwned?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exclusions, setExclusions] = useState<
    { contents: string[]; path_name: string }[]
  >([]);

  const handleOpenExclusions = () => {
    setExclusions(offer.exclusions || []);
    onOpen();
  };

  const handleCloseExclusions = () => {
    onClose();
    setExclusions([]);
  };

  return (
    <>
      <li className="relative grid gap-4 rounded-xl bg-white p-4 sm:grid-cols-5 sm:gap-6">
        <div className="relative sm:col-span-2">
          <ImageLoader
            src={card.cardImage}
            alt={card.name}
            width={400}
            height={252}
            className="w-full rounded-xl border object-cover sm:rounded-lg"
          />
          {userOwned && (
            <RiPokerHeartsFill
              size="20"
              className="absolute top-3 left-3 text-orange-500"
            />
          )}
        </div>
        <div className="sm:col-span-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <Badge variant="orange">
              {offer.name}{" "}
              {Math.round(
                (offer.rate?.LEVEL_2 || offer.rate?.SIMPLE || 0) * 1000,
              ) / 10}
              %
            </Badge>
            {offer.rate?.NEW && (
              <Badge variant="amber">
                新戶加碼 {Math.round((offer.rate?.NEW || 0) * 1000) / 10}%
              </Badge>
            )}
            {offer.rate?.BONUS && (
              <Badge variant="amber">
                加碼 {Math.round((offer.rate?.BONUS || 0) * 1000) / 10}%
              </Badge>
            )}
            {offer.rate?.EXCHANGE && (
              <Badge variant="outline">
                免國外交易服務費
                {Math.round((offer.rate?.EXCHANGE || 0) * 1000) / 10}%
              </Badge>
            )}
            <Badge variant="sky">
              {offer.calc_rules?.unlimited
                ? "回饋無上限"
                : `上限 ${offer.calc_rules?.cap_per_month || 0} ${offer.calc_rules?.cap_unit === "points" ? "點" : "元"}`}
            </Badge>
          </div>
          <div className="text-lg font-semibold">{card.name}</div>
          <p className="mb-3 text-gray-500">{card.issuer}</p>
          <p>{offer.note}</p>
        </div>

        {offer?.exclusions && offer.exclusions.length > 0 && (
          <Button
            className="absolute top-8 right-8 sm:top-4 sm:right-4"
            size="icon"
            variant="outline"
            onClick={handleOpenExclusions}
          >
            <FiInfo className="" />
          </Button>
        )}
      </li>

      <ExclusionDialog
        exclusions={exclusions}
        isOpen={isOpen}
        onClose={handleCloseExclusions}
      />
    </>
  );
};
