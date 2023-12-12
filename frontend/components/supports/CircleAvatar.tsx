import Image from "next/image";

interface Props {
  src: string;
  size?: number;
}

const CircleAvatar = ({ src, size = 2.5 }: Props) => {
  return (
    <button
      className="relative overflow-hidden rounded-full"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <Image
        src={src}
        alt="avatar"
        fill
        sizes="100%"
        style={{ objectFit: "cover" }}
      />
    </button>
  );
};
export default CircleAvatar;
