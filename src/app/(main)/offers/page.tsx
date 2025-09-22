import React from "react";

import OffersList from "./offers-list";
import FilterBar from "@/app/(main)/dashboard/filter-bar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <div className="p-5">
      <div className="rounded-lg bg-white p-4 sm:p-5">
        <h1 className="mb-3 text-2xl font-semibold">優惠速查</h1>
        <FilterBar />
      </div>

      <OffersList />
    </div>
  );
}
