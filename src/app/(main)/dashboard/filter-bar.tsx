"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchByKeyword } from "@/app/types/search";

type Props = {
  onSearch?: (results: { card: any; offer: any }[]) => void;
};

export default function FilterBar({ onSearch }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");

  // 搜尋/套用
  function apply() {
    const res = searchByKeyword(q);
    onSearch?.(res);

    console.log(res);

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    router.push(`/offers?${params.toString()}`);
  }

  return (
    <div className="grid items-center gap-3 sm:grid-cols-[1fr,160px,140px,140px,160px,auto]">
      <Input
        placeholder="關鍵字搜尋"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <Button onClick={() => apply()}>搜尋</Button>
    </div>
  );
}
