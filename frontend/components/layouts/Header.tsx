import Image from "next/image";
import CircleAvatar from "../supports/CircleAvatar";
import Link from "next/link";

const HeaderDefault = () => {
  const buttons = [
    { path: "/svgs/plus.svg" },
    { path: "/svgs/messenger.svg" },
    { path: "/svgs/notification.svg" },
  ];

  return (
    <div className="sticky top-0 z-50 flex bg-white px-2 shadow">
      <div className="flex h-[55px] flex-1 items-center py-2">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={115} height={40} />
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

      <div className="hidden flex-1 justify-center sm:flex">
        {Array(4)
          .fill(0)
          .map((e, index) => (
            <div
              key={index}
              className="flex max-w-[7rem] grow items-center justify-center"
            >
              <Image
                className="fill-secondary"
                src={"/svgs/home.svg"}
                alt=""
                width={24}
                height={24}
              />
            </div>
          ))}
      </div>

      <div className="flex flex-1 items-center justify-end space-x-2">
        {buttons.map((button, index) => (
          <div key={index} className="rounded-full bg-secondary-button p-2.5">
            <Image src={button.path} alt="" width={20} height={20} />
          </div>
        ))}
        <CircleAvatar src="/images/avatar.jpg" />
      </div>
    </div>
  );
};
export default HeaderDefault;
