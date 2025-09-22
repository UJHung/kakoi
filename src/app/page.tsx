"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function newId() {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

export default function Home() {
  const router = useRouter();

  const handleStartExperience = () => {
    // 設定 guestId cookie
    const id = newId();
    document.cookie = `guestId=${id}; path=/; max-age=${60 * 60 * 24 * 365 * 2}; samesite=lax`;

    // 導向卡片頁面
    router.replace("/cards");
  };

  return (
    <div
      className="relative grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20"
      style={{
        backgroundImage: "url('/logo-bg.svg')",
        backgroundPosition: "left top",
        backgroundSize: "100px",
      }}
    >
      <main className="row-start-2 flex flex-col items-center">
        <Image
          className="dark:invert"
          src="/logo-vertical.svg"
          alt="Kaku logo"
          width={200}
          height={200}
          priority
        />
        <div className="mb-6 text-center text-lg font-semibold">
          卡在KAKOi，優惠都可以
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={handleStartExperience}
            className="bg-foreground text-background flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-800 disabled:opacity-20 sm:px-5 sm:text-base"
          >
            立即體驗
          </button>
        </div>
      </main>
    </div>
  );
}
