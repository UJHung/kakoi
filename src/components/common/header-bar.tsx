import Image from "next/image";

import LogoName from "@/assets/logo-name.svg";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 pb-0">
      <Image src={LogoName} alt="Logo" width={150} height={50} />
    </header>
  );
}
