import { Metadata } from "next";

import Nav from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import HeaderBar from "@/components/common/header-bar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "KAKOi｜我的信用卡優惠管理助手",
    template: "%s｜KAKOi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen pb-20 lg:max-w-2xl">
      <HeaderBar />
      {children}
      <Nav />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
