"use client";

import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import ImageLoader from "@/components/image-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExclusionDialog from "@/app/(main)/offers/exclusion-dialog";
import { searchByKeyword, searchByCategory } from "@/app/types/search";
import FilterBar from "@/app/(main)/dashboard/filter-bar";
import cardData from "@/data/cards.json";

export default function OffersPage() {
  const [results, setResults] = useState<{ card: any; offer: any }[]>([]);
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
        <h2 className="text-lg font-medium">搜尋結果</h2>

        <div className="py-1">
          {q && (
            <Badge variant="white" size="sm">
              {q}
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="white" size="sm">
              {selectedCategory.name}
            </Badge>
          )}
        </div>

        <ul className="mt-3 space-y-3">
          {results.map((r, i) => (
            <Card key={i} card={r.card} offer={r.offer} />
          ))}
          {results.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-400">
              <BiSearchAlt size="24" className="mb-2 inline" />
              <div>尚無結果</div>
            </div>
          )}
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
      <li className="relative grid grid-cols-5 gap-5 rounded-xl bg-white p-4">
        <div className="col-span-2">
          <ImageLoader
            src={card.cardImage}
            alt={card.name}
            width={400}
            height={252}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="col-span-3">
          <div className="text-lg font-semibold">{card.name}</div>
          <p className="mb-3 text-gray-500">{card.issuer}</p>
          <div className="flex gap-x-1.5">
            <Badge variant="orange" className="mb-2">
              {offer.name} {Math.round((offer.rate?.LEVEL_2 || 0) * 1000) / 10}%
            </Badge>
            <Badge variant="sky" className="mb-2">
              {offer.calc_rules?.unlimited
                ? "回饋無上限"
                : `上限 ${offer.calc_rules?.cap || 0} 元`}
            </Badge>
          </div>
          <p>{offer.note}</p>
        </div>

        <Button
          className="absolute top-4 right-4"
          size="icon"
          variant="outline"
          onClick={() => {
            setIsOpen(true);
            setExclusions(offer.exclusions || []);
          }}
        >
          <FiInfo className="" />
        </Button>
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
