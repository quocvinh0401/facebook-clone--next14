"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAlarm } from "~/hooks/use-alarm";
import { navItems } from "~/support/menu";
import { cn, isActiveNav } from "~/utils/utility";
import HeaderRight from "./HeaderRight";

const HeaderDefault = () => {
  const pathname = usePathname();
  useAlarm();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-2 shadow">
      <div className="flex h-[55px] flex-1 items-center py-2">
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={115}
            height={40}
            className="h-auto w-auto
            "
          />
        </Link>
        <div className="flex items-center space-x-2 rounded-full bg-primary p-2">
          <Image src={"/svgs/search.svg"} alt="search" width={20} height={20} />
          <input
            type="text"
            placeholder="Search"
            className="hidden bg-transparent xl:block"
          />
        </div>
      </div>

      <div className="hidden flex-1 justify-center gap-2 sm:flex">
        {navItems.map((item, index) => (
          <div key={index} className="flex w-full max-w-[110px] flex-col">
            <Link
              href={item.href}
              className={cn(
                "mt-1  flex flex-1 items-center justify-center rounded-lg",
                "hover:bg-hover-overlay",
              )}
            >
              {isActiveNav(item.href, pathname) ? (
                <item.IconActive className="h-6 w-6 fill-secondary" />
              ) : (
                <item.Icon className="h-6 w-6" />
              )}
            </Link>
            <div
              className={cn(
                "h-1 rounded",
                isActiveNav(item.href, pathname) && "bg-secondary",
              )}
            ></div>
          </div>
        ))}
      </div>

      <HeaderRight />
    </div>
  );
};
export default HeaderDefault;
