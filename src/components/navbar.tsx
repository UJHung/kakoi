"use client";

import { TbCardsFilled, TbSearch } from "react-icons/tb";
import { GoHomeFill } from "react-icons/go";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/cards", icon: TbCardsFilled, id: "cards" },
    { href: "/dashboard", icon: GoHomeFill, id: "dashboard" },
    { href: "/offers", icon: TbSearch, id: "offers" },
  ];

  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/40 p-1 text-white shadow-lg backdrop-blur-sm">
      <div className="relative flex gap-x-1">
        {/* Sliding background indicator */}
        <div
          className="absolute inset-y-0 w-12 rounded-full bg-black shadow-md transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${activeIndex >= 0 ? activeIndex * 52 : 0}px)`,
            opacity: activeIndex >= 0 ? 1 : 0,
          }}
        />

        {navItems.map(({ href, icon: Icon, id }) => {
          const isActive = pathname === href;
          return (
            <Link key={id} href={href}>
              <div className="relative z-10 rounded-full p-3 transition-all duration-100 hover:bg-white/10">
                <Icon
                  size="24"
                  className={isActive ? "text-white" : "text-black"}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
