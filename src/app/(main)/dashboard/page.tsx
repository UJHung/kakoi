import FilterBar from "./filter-bar";
import FilterTag from "./filter-tag";
import CategoryBlock from "./category-block";
import { categories } from "@/data/dashboard";

export default async function Page() {
  return (
    <div className="space-y-6 p-5">
      <div className="rounded-lg bg-white p-5">
        <h1 className="mb-3 text-2xl font-semibold">優惠速查</h1>
        <FilterBar />
      </div>

      <div className="rounded-lg bg-white p-5">
        <h1 className="mb-3 text-2xl font-semibold">常用標籤</h1>
        <FilterTag />
      </div>

      <div className="grid grid-cols-2 gap-6">
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
