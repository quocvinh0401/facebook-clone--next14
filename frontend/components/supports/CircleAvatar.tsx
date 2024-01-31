import Image from "next/image";
import { memo } from "react";

interface Props {
  src?: string;
  size?: number;
}

const CircleAvatar = ({ src, size = 40 }: Props) => {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-full"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src || "/images/avatar.jpg"}
        alt="avatar"
        fill
        sizes="100%"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
export default memo(CircleAvatar);
