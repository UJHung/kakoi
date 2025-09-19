"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { searchTags } from "@/data/dashboard";

export default function FilterTag() {
  const router = useRouter();

  // 搜尋/套用
  function apply(tag: string) {
    const params = new URLSearchParams();
    if (tag) params.set("q", tag);
    router.push(`/offers?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {searchTags?.map((tag, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => {
            apply(tag);
          }}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
