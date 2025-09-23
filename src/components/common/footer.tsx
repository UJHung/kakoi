import ImageLoader from "@/components/common/image-loader";

export default function Footer() {
  return (
    <div className="mt-8 p-5 text-center text-xs">
      <ImageLoader
        src="/logo-vertical.svg"
        alt="Kakoi"
        width={80}
        height={24}
        className="mx-auto mb-2"
      />
      <div>© 2025 Kakoi. All rights reserved.</div>
      <div>優惠資訊僅供參考，請以銀行官方公告為準</div>
    </div>
  );
}
