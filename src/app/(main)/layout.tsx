import Nav from "@/components/navbar";
import HeaderBar from "@/components/header-bar";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster position="bottom-center" />
    </div>
  );
}
