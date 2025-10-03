"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function newId() {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartExperience = () => {
    setIsLoading(true);

    // 設定 guestId cookie
    const id = newId();
    document.cookie = `guestId=${id}; path=/; max-age=${60 * 60 * 24 * 365 * 2}; samesite=lax`;

    // 導向儀表板頁
    router.replace("/dashboard");
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
          alt="KAKOi"
          width={200}
          height={200}
          priority
        />
        <h1 className="mb-2 text-center text-lg font-semibold">
          卡在KAKOi，優惠都可以
        </h1>
        <h2 className="mb-6">整理銀行優惠｜快速查詢｜不再錯過回饋</h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={handleStartExperience}
            disabled={isLoading}
            className="bg-foreground text-background flex cursor-pointer items-center justify-center rounded-xl px-6 py-4 text-lg font-medium transition-all hover:scale-95 hover:bg-black/70 disabled:opacity-50 sm:rounded-lg sm:text-base"
          >
            {isLoading && (
              <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            立即體驗
          </button>
        </div>
      </main>
    </div>
  );
}
