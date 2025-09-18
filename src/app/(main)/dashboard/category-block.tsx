"use client";

import { FaPlane, FaStore } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function CategoryBlock({
  category,
  title,
  desc,
}: {
  category: string;
  title: string;
  desc: string;
}) {
  const router = useRouter();
  const categoryIcon =
    category == "ecommerce" ? (
      <div className="mb-2 inline-block rounded-md bg-orange-500 p-2">
        <RiShoppingBasketFill size="28" className="text-white" />
      </div>
    ) : category == "travel" ? (
      <div className="mb-2 inline-block rounded-md bg-yellow-500 p-2">
        <FaPlane size="28" className="text-white" />
      </div>
    ) : category == "convenience" ? (
      <div className="mb-2 inline-block rounded-md bg-sky-500 p-2">
        <FaStore size="28" className="text-white" />
      </div>
    ) : category == "dining" ? (
      <div className="mb-2 inline-block rounded-md bg-blue-500 p-2">
        <TbBowlSpoonFilled size="28" className="text-white" />
      </div>
    ) : null;

  const clickFunction = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    router.push(`/offers?${params.toString()}`);
  };

  return (
    <div
      onClick={() => clickFunction()}
      className="cursor-pointer rounded-lg bg-white p-5 transition-shadow hover:md:shadow-md"
    >
      {categoryIcon}
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  );
}
