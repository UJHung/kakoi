"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Kaku logo"
          width={100}
          height={100}
          priority
        />
        <div className="mt-2 text-xl font-bold">KAKOi</div>
        <div className="mt-3 mb-6">卡片都在這，優惠不會漏</div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              router.push("/cards");
            }}
            className="bg-foreground text-background hover:bg-foreground/70 flex cursor-pointer items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition-colors disabled:opacity-20 sm:px-5 sm:text-base"
          >
            {/* 即將推出 */}
            立即體驗
          </button>
        </div>
      </main>
    </div>
  );
}
