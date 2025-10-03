import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils/utils";
import "./globals.css";

const lineSeed = localFont({
  src: [
    { path: "./fonts/LINESeedTW_OTF_Rg.woff", weight: "500", style: "normal" },
    { path: "./fonts/LINESeedTW_OTF_Bd.woff", weight: "700", style: "medium" },
  ],
  display: "swap",
  variable: "--font-line-seed",
});

export const metadata: Metadata = {
  title: "KAKOi｜我的信用卡優惠管理助手",
  description:
    "KAKOi 專注於『我的信用卡』，幫你整理銀行優惠，不再錯過回饋。快速查詢、清楚比較，讓你用對卡、省時間、省金錢。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://kakoi.app"),
  openGraph: {
    images: ["/image-seo.png"],
  },
  icons: {
    icon: [
      { url: "/fav16.png", sizes: "16x16", type: "image/png" },
      { url: "/fav32.png", sizes: "32x32", type: "image/png" },
      { url: "/fav48.png", sizes: "48x48", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(lineSeed.variable, "bg-gray-100")}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
