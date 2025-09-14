import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col row-start-2 items-center ">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Kaku logo"
          width={100}
          height={100}
          priority
        />
        <div className="font-bold text-xl mt-2">KAKU</div>
        <div className="mb-6 mt-3">你的個人信用卡與優惠管理工具</div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            disabled
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto disabled:opacity-20"
          >
            即將推出
          </button>
        </div>
      </main>
    </div>
  );
}
