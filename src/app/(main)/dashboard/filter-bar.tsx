"use client";

import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardProps, OfferProps } from "@/app/types/card";
import { searchByKeyword } from "@/app/types/search";
import { searchTags } from "@/data/dashboard";

type Props = {
  onSearch?: (results: { card: CardProps; offer: OfferProps }[]) => void;
};

export default function FilterBar({ onSearch }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // 搜尋/套用
  async function apply(tag?: string) {
    const res = await searchByKeyword(tag || q || "");
    onSearch?.(res);

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tag) params.set("q", tag);
    router.push(`/offers?${params.toString()}`);
  }

  return (
    <div>
      <div className="relative flex w-full items-center gap-2">
        <Input
          placeholder="關鍵字"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) {
              apply();
              e.currentTarget.blur();
            }
          }}
          className="h-11"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1.5 right-2"
          onClick={() => apply()}
        >
          <TbSearch size="20" />
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {searchTags?.map((tag, index) => (
          <Button
            size="sm"
            key={index}
            className="rounded-full"
            variant="outline"
            onClick={() => {
              apply(tag);
            }}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
