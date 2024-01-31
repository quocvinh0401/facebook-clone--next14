"use client";

import { useEffect, useState } from "react";
import { useGet } from "~/hooks/use-api";
import { Post } from "~/interface/post.interface";
import PostCard from "./PostCard";
import { emitter } from "~/utils/emitter";
import { useFetchWithCredentials } from "~/hooks/use-fetch-with-credentials";

const NewsFeed = () => {
  const { data: posts, refresh } = useFetchWithCredentials<Post[]>("post");

  const handleAddPost = () => {
    refresh();
  };

  useEffect(() => {
    const event = emitter.addListener("add-post", handleAddPost);
    return () => event.remove();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {posts?.length! > 0 ? (
        posts?.map((post, index) => <PostCard post={post} key={index} />)
      ) : (
        <div className="text-center font-semibold text-secondary-content">
          Add friends to view more posts
        </div>
      )}
    </div>
  );
};
export default NewsFeed;
