"use client";

import NewsFeed from "./NewsFeed";
import PostStatus from "./PostStatus";
import Story from "./Story";
import { cn } from "~/utils/utility";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

const Body = () => {
  const { isUsed } = useSelector((state: RootState) => state.modal);

  return (
    <div
      className={cn(
        "max-w-[36rem] grow space-y-4 py-4 sm:mx-8 sm:min-w-[31.25rem]",
        isUsed ? "h-[calc(100vh-55px)] overflow-hidden" : "",
      )}
    >
      <Story />
      <PostStatus />
      <NewsFeed />
    </div>
  );
};
export default Body;
