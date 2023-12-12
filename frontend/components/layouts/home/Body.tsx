import { User } from "~/interface/user.interface";
import NewsFeed from "./NewsFeed";
import PostStatus from "./PostStatus";
import Story from "./Story";

interface Props {
  user: User;
}

const Body = () => {
  return (
    <div className="my-4 max-w-[36rem] grow space-y-4 sm:mx-8 sm:min-w-[31.25rem]">
      <Story />
      <PostStatus />
      <NewsFeed />
    </div>
  );
};
export default Body;
