import Image from "next/image";
import { PostMedia, MediaType } from "~/interface/post.interface";
import { cn } from "~/utils/utility";

interface Props {
  medias: PostMedia[];
}

const GridMedia = ({ medias }: Props) => {
  return (
    <div className="grid gap-1">
      <MediaCard media={medias[0]} />
      {medias.length > 1 && (
        <div className="flex gap-1">
          {medias.slice(1, 4).map((media, index) => (
            <div key={index} className="relative flex-1">
              <div
                className={cn("h-full", medias.length > 2 && "max-h-[150px]")}
              >
                <MediaCard key={index} media={media} />
              </div>
              {medias.length > 4 && index === 2 && (
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/20 text-[32px] font-semibold text-white">
                  +{medias.length - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MediaCard = ({ media }: { media: PostMedia }) => {
  return media.type.toUpperCase().startsWith(MediaType.IMAGE) ? (
    <Image
      src={media.url}
      alt=""
      width={0}
      height={0}
      sizes="100vw"
      className="h-full w-full object-cover"
    />
  ) : (
    <video controls>
      <source src={media.url} type={media.type} />
    </video>
  );
};
export default GridMedia;
