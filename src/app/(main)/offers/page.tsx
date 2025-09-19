"use client";

import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import ImageLoader from "@/components/image-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExclusionDialog from "@/app/(main)/offers/exclusion-dialog";
import { searchByKeyword, searchByCategory } from "@/app/types/search";
import FilterBar from "@/app/(main)/dashboard/filter-bar";
import cardData from "@/data/cards.json";

export default function OffersPage() {
  const [results, setResults] = useState<{ card: any; offer: any }[]>([]);
  const rounter = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q");
  const categorySlug = sp.get("category");
  const selectedCategory = categorySlug
    ? cardData.categories.find((c) => c.slug === categorySlug)
    : null;

  useEffect(() => {
    const q = sp.get("q") ?? "";
    const category = sp.get("category") ?? "";

    if (category) {
      const res = searchByCategory([category]);
      setResults(res);
      return;
    }
    if (q.trim() === "") {
      setResults([]);
      return;
    }

    const res = searchByKeyword(q);
    setResults(res);
  }, [sp]);

  return (
    <div className="p-5">
      <div className="rounded-lg bg-white p-5">
        <h1 className="mb-3 text-2xl font-semibold">優惠速查</h1>
        <FilterBar
          onSearch={(res) => {
            console.log(res);

            setResults(res);
          }}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">{q || selectedCategory?.name}</h2>

        <ul className="mt-3 space-y-3">
          {results.map((r, i) => (
            <Card key={i} card={r.card} offer={r.offer} />
          ))}
          {results.length === 0 && (
            <div className="pt-8 text-center text-sm">
              <BiSearchAlt size="24" className="mb-2 inline" />
              <div>尚無結果</div>
            </div>
          )}
          <div className="text-center">
            <Button
              size="lg"
              className="mt-4"
              onClick={() => {
                rounter.push("/dashboard");
              }}
            >
              返回首頁
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
}

const Card = ({ card, offer }: { card: any; offer: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exclusions, setExclusions] = useState<
    { contents: string[]; path_name: string }[]
  >([]);

  return (
    <>
      <li className="relative grid gap-4 rounded-xl bg-white p-4 sm:grid-cols-5 sm:gap-6">
        <div className="sm:col-span-2">
          <ImageLoader
            src={card.cardImage}
            alt={card.name}
            width={400}
            height={252}
            className="w-full rounded-xl border object-cover sm:rounded-lg"
          />
        </div>
        <div className="sm:col-span-3">
          <div className="mb-1 flex flex-wrap gap-1.5">
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
            onClick={() => {
              setIsOpen(true);
              setExclusions(offer.exclusions || []);
            }}
          >
            <FiInfo className="" />
          </Button>
        )}
      </li>

      <ExclusionDialog
        exclusions={exclusions}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setExclusions([]);
        }}
      />
    </>
  );
};
