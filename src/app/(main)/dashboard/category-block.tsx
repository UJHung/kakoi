"use client";

import { FaPlane, FaStore } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { FaMotorcycle } from "react-icons/fa6";
import { MdStore } from "react-icons/md";
import { BiSolidWallet, BiSolidTrain, BiSolidVideos } from "react-icons/bi";

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
      <div className="mb-2 inline-block rounded-md bg-orange-400 p-2">
        <RiShoppingBasketFill size="28" className="text-white" />
      </div>
    ) : category == "travel" ? (
      <div className="mb-2 inline-block rounded-md bg-amber-400 p-2">
        <FaPlane size="28" className="text-white" />
      </div>
    ) : category == "convenience" ? (
      <div className="mb-2 inline-block rounded-md bg-yellow-400 p-2">
        <MdStore size="28" className="text-white" />
      </div>
    ) : category == "dining" ? (
      <div className="mb-2 inline-block rounded-md bg-lime-400 p-2">
        <TbBowlSpoonFilled size="28" className="text-white" />
      </div>
    ) : category == "food_delivery" ? (
      <div className="mb-2 inline-block rounded-md bg-green-500/70 p-2">
        <FaMotorcycle size="28" className="text-white" />
      </div>
    ) : category == "mobile_wallet" ? (
      <div className="mb-2 inline-block rounded-md bg-teal-500 p-2">
        <BiSolidWallet size="28" className="text-white" />
      </div>
    ) : category == "transport" ? (
      <div className="mb-2 inline-block rounded-md bg-sky-300 p-2">
        <BiSolidTrain size="28" className="text-white" />
      </div>
    ) : category == "ott" ? (
      <div className="mb-2 inline-block rounded-md bg-blue-400 p-2">
        <BiSolidVideos size="28" className="text-white" />
      </div>
    ) : category == "grocery_hyper" ? (
      <div className="mb-2 inline-block rounded-md bg-indigo-400 p-2">
        <FaStore size="28" className="text-white" />
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
      className="cursor-pointer rounded-lg bg-white p-4 transition-shadow sm:p-5 hover:md:shadow-md"
    >
      {categoryIcon}
      <h3 className="text-md font-semibold sm:text-lg">{title}</h3>
      <p className="mt-1 hidden text-xs text-gray-400 md:block">{desc}</p>
    </div>
  );
}
