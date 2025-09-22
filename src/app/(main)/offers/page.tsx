import React, { Suspense } from "react";

import OffersList from "./offers-list";
import FilterBar from "@/app/(main)/dashboard/filter-bar";

export default function OffersPage() {
  return (
    <div className="p-5">
      <div className="rounded-lg bg-white p-5">
        <h1 className="mb-3 text-2xl font-semibold">優惠速查</h1>
        <FilterBar />
      </div>

      <OffersList />
    </div>
  );
}
