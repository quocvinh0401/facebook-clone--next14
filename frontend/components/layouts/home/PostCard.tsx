import { Builder } from "builder-pattern";
import Image from "next/image";
import { useSelector } from "react-redux";
import CircleAvatar from "~/components/supports/CircleAvatar";
import GridMedia from "~/components/supports/GridMedia";
import { usePatch } from "~/hooks/use-api";
import { LikeType, Post, PostLike } from "~/interface/post.interface";
import { RootState } from "~/redux/store";
import { postAudiences } from "~/support/menu";
import { changeFormDate, changeFormNumber, cn } from "~/utils/utility";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  const patchPost = usePatch("post", { alert: { isUsed: false } });

  post.likes = post.likes ?? [];

  const myLike = post.likes?.find((like) => like.user_id == user.id);

  const handleLike = async (type: LikeType, isButton = false) => {
    if (myLike) {
      if (isButton) {
        myLike.is_like = !myLike.is_like;
        myLike.is_like ? post.count_like++ : post.count_like--;
      } else myLike.type = type;

      await patchPost("like", myLike);
    } else {
      const like = Builder<PostLike>()
        .is_like(true)
        .type(type)
        .post_id(post.id)
        .user_id(user.id)
        .build();

      const response = (await patchPost("like", like)) as PostLike;

      post.likes?.push(response);
      post.count_like++;
    }
  };

  const Icon = postAudiences.find((a) => a.type == post.audience)?.Icon;
  return (
    <div className="container shadow">
      <div className="px-3 py-2">
        <div className="mb-1 flex items-center space-x-2">
          <CircleAvatar src="/images/avatar.jpg" size={2.25} />
          <div className="grow">
            <div className="cursor-pointer font-semibold hover:underline">
              {`${post.user?.first_name} ${post.user?.surname}`}
            </div>
            <div className="flex items-center gap-1 text-s text-secondary-content">
              <span>{changeFormDate(post.created_at)}</span>
              <span>·</span>
              <Icon width={15} height={15} color="#65676B" />
            </div>
          </div>
          <button className="rounded-full p-2 hover:bg-hover">
            <Image src={"/svgs/x-clear.svg"} alt="x" width={20} height={20} />
          </button>
        </div>
        <div>{post.caption ?? ""}</div>
      </div>

      <div>{post.medias && <GridMedia medias={post.medias} />}</div>

      <div className="p-1">
        <div className="flex justify-between border-b px-3 py-2">
          <div className="flex items-center space-x-1">
            <ImageReaction like={myLike!} />
            <button className="text-secondary-content hover:underline">
              {changeFormNumber(post.count_like)}
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="text-secondary-content hover:underline">
              {changeFormNumber(post.count_comment)} comments
            </button>
            <button className="text-secondary-content hover:underline">
              59 shares
            </button>
          </div>
        </div>
        <div className="mt-1 grid grid-cols-3">
          <button
            onClick={() => handleLike(LikeType.LIKE, true)}
            className="flex w-full items-center justify-center space-x-1 rounded-lg py-0.5 hover:bg-hover"
          >
            <ImageReaction like={myLike!} />
            <div
              className={cn(
                "font-semibold",
                myLike?.is_like && "text-secondary",
              )}
            >
              Like
            </div>
          </button>
          <button className="flex w-full items-center justify-center space-x-1 rounded-lg py-0.5 hover:bg-hover">
            <Image
              src={"/svgs/comment.svg"}
              alt="comment"
              width={20}
              height={20}
            />
            <div>Comment</div>
          </button>
          <button className="flex w-full items-center justify-center space-x-1 rounded-lg py-0.5 hover:bg-hover">
            <Image src={"/svgs/share.svg"} alt="share" width={20} height={20} />
            <div>Share</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageReaction = ({ like }: { like: PostLike }) => {
  return like?.is_like ? (
    <Image
      src={`/images/emoji/${like.type.toLowerCase()}.png`}
      alt={like.type}
      width={20}
      height={20}
    />
  ) : (
    <Image
      src={"/svgs/like.svg"}
      alt="like"
      width={20}
      height={20}
      className="h-5 w-5"
    />
  );
};
export default PostCard;
