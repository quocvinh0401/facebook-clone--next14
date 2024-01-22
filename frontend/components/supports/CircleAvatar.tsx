import Image from "next/image";

interface Props {
  src?: string;
  size?: number;
}

const CircleAvatar = ({ src, size = 2.5 }: Props) => {
  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-full"
      style={{ width: `${size}rem`, height: `${size}rem` }}
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
export default CircleAvatar;
