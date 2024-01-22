"use client";

import { useEffect, useState } from "react";
import { useGet } from "~/hooks/use-api";
import { Post } from "~/interface/post.interface";
import PostCard from "./PostCard";
import { emitter } from "~/utils/emitter";

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = useGet<Post[]>("post", { alert: { isUsed: false } });

  const handleAddPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await getPosts();
      setPosts(response);
    };

    fetch();
  }, []);

  useEffect(() => {
    const event = emitter.addListener("add-post", handleAddPost);
    return () => event.remove();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {posts.length > 0 ? (
        posts.map((post, index) => <PostCard post={post} key={index} />)
      ) : (
        <></>
      )}
    </div>
  );
};
export default NewsFeed;
