"use client";

import { IconWorld } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CircleAvatar from "~/components/supports/CircleAvatar";
import GridMedia from "~/components/supports/GridMedia";
import { useGet } from "~/hooks/use-api";
import { Post } from "~/interface/post.interface";
import { postAudiences } from "~/support/menu";
import { changeFormDate, changeFormNumber } from "~/utils/utility";

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = useGet<Post[]>("post", { alert: { isUsed: false } });

  useEffect(() => {
    const fetchs = async () => {
      const response = await getPosts();
      setPosts(response);
    };

    fetchs();
  }, []);
  return (
    <div className="flex flex-col space-y-4">
      {posts.map((post, index) => {
        const Icon = postAudiences.find((a) => a.type == post.audience)?.Icon;
        return (
          <div key={index} className="container shadow">
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
                  <Image
                    src={"/svgs/x-clear.svg"}
                    alt="x"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div>{post.caption ?? ""}</div>
            </div>

            <div>{post.medias && <GridMedia medias={post.medias} />}</div>

            <div className="p-1">
              <div className="flex justify-between border-b px-3 py-2">
                <div className="flex items-center space-x-1">
                  <Image
                    src={"/svgs/like.svg"}
                    alt="like"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
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
                <button className="flex w-full items-center justify-center space-x-1 rounded-lg py-0.5 hover:bg-hover">
                  <Image
                    src={"/svgs/like.svg"}
                    alt="like"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <div>Like</div>
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
                  <Image
                    src={"/svgs/share.svg"}
                    alt="share"
                    width={20}
                    height={20}
                  />
                  <div>Share</div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default NewsFeed;
