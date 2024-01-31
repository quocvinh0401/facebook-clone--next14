"use client";

import PostCard from "~/components/layouts/home/PostCard";
import { useFetchWithCredentials } from "~/hooks/use-fetch-with-credentials";
import { Post } from "~/interface/post.interface";

interface ParamsProps {
  params: {
    id: string;
  };
}

const getServerSideProps = async ({ params }: ParamsProps) => {
  return params;
};

const PostDetail = ({ params }: ParamsProps) => {
  const {
    data: post,
    isLoading,
    refresh,
  } = useFetchWithCredentials<Post>(`post/${params.id}`);

  if (isLoading) return;

  if (post)
    return (
      <div className="mt-4 flex justify-center">
        <div className="max-w-[500px]">
          <PostCard post={post!} />
        </div>
      </div>
    );
};
export default PostDetail;
