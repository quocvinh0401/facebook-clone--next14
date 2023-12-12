"use client";
import UserCard from "~/components/supports/UserCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

const MenuLeft = () => {
  const [height, setHeight] = useState(0);
  const router = useRouter();

  const menus = [
    { position: 224, title: "Find friends" },
    { position: 391, title: "Video" },
    { position: 334, title: "Memories" },
    { position: 140, title: "Saved" },
    { position: 27, title: "Groups" },
    { position: 308, title: "Marketplace" },
    { position: 253, title: "Fundraisers" },
    { position: 85, title: "Pages" },
    { position: 55, title: "Play Games", href: "/games" },
  ];

  useEffect(() => {
    const resize = () => setHeight(window.innerHeight - 56);
    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const onClickTab = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      className={`sticky top-14 hidden min-w-[17.5rem] max-w-[22.5rem] grow overflow-hidden py-4  pl-2 hover:overflow-y-auto lg:block`}
      style={{ height }}
    >
      <UserCard />
      {menus.map((item, index) => (
        <button
          key={index}
          onClick={() => onClickTab(item.href)}
          className="flex w-full  items-center space-x-2 rounded-lg p-2 hover:bg-hover"
        >
          <div
            className="h-7 w-7 bg-[url('~/public/images/menu_left.png')] bg-cover bg-no-repeat"
            style={{ backgroundPositionY: `-${item.position}px` }}
          ></div>
          <span className="text-s font-medium">{item.title}</span>
        </button>
      ))}
    </div>
  );
};
export default MenuLeft;
