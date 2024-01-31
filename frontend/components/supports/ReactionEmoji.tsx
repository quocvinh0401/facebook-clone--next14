import Image from "next/image";
import { LikeType } from "~/interface/post.interface";
import { emojis } from "~/support/menu";

interface ReactEmojiProps {
  onReact: (type: LikeType) => void;
}

const ReactEmoji = ({ onReact }: ReactEmojiProps) => {
  return (
    <div className="flex w-fit gap-3 rounded-full border bg-white p-1 shadow">
      {emojis.map((emoji) => (
        <button key={emoji.title} onClick={() => onReact(emoji.type)}>
          <Image
            src={emoji.gif}
            width={32}
            height={32}
            alt={emoji.title}
            className="hover h-8 w-8 shrink-0 transition-all duration-150 hover:scale-125"
          />
        </button>
      ))}
    </div>
  );
};
export default ReactEmoji;
