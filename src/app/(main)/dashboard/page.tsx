import { Suspense } from "react";

import FilterBar from "./filter-bar";
import CategoryBlock from "./category-block";
import MyCardBlock from "./my-card-block";
import { categories } from "@/data/dashboard";
import { LoadingSmallCards } from "@/components/common/loading-card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  return (
    <div className="space-y-4 p-5 sm:space-y-6">
      <div className="rounded-lg bg-white p-4 sm:p-5">
        <h1 className="mb-3 text-2xl font-semibold">我的卡片</h1>
        <Suspense fallback={<LoadingSmallCards />}>
          <MyCardBlock />
        </Suspense>
      </div>

      <div className="rounded-lg bg-white p-4 sm:p-5">
        <h1 className="mb-3 text-2xl font-semibold">優惠速查</h1>
        <FilterBar />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center md:gap-6 md:text-left">
        {categories.map((cat) => (
          <CategoryBlock
            key={cat.category}
            category={cat.category}
            title={cat.title}
            desc={cat.desc}
          />
        ))}
      </div>
    </div>
  );
}
