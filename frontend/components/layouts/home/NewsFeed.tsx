"use client";

import Image from "next/image";
import CircleAvatar from "~/components/supports/CircleAvatar";

const NewsFeed = () => {
  return (
    <div className="flex flex-col space-y-4">
      {Array(5)
        .fill(0)
        .map((post, index) => (
          <div key={index} className="container shadow">
            <div className="px-3 py-2">
              <div className="mb-1 flex items-center space-x-2">
                <CircleAvatar src="/images/avatar.jpg" size={2.25} />
                <div className="grow">
                  <div className="cursor-pointer font-semibold hover:underline">
                    Le Quoc Vinh
                  </div>
                  <div className="text-s text-secondary-content">5m</div>
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
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
                facilis nostrum optio sunt minus voluptatum laudantium modi,
                exercitationem vitae reprehenderit eaque repudiandae. Omnis
                minima aut laudantium a doloribus dolores nulla.
              </div>
            </div>

            <div className="relative h-40 w-full">
              <Image
                src={
                  "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
                }
                alt=""
                fill
                sizes="100%"
              />
            </div>

            <div className="p-1">
              <div className="flex justify-between border-b px-3 py-2">
                <div className="flex space-x-1">
                  <Image
                    src={"/svgs/like.svg"}
                    alt="like"
                    width={18}
                    height={18}
                  />
                  <span className="text-secondary-content">200</span>
                </div>
                <div className="flex space-x-2">
                  <div className="text-secondary-content">2.2K comments</div>
                  <div className="text-secondary-content">59 shares</div>
                </div>
              </div>
              <div className="mt-1 grid grid-cols-3">
                <button className="flex w-full items-center justify-center space-x-1 rounded-lg py-0.5 hover:bg-hover">
                  <Image
                    src={"/svgs/like.svg"}
                    alt="like"
                    width={20}
                    height={20}
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
        ))}
    </div>
  );
};
export default NewsFeed;
