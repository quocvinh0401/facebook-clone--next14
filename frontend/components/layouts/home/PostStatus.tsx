import { useSelector } from "react-redux";
import CircleAvatar from "~/components/supports/CircleAvatar";
import { User } from "~/interface/user.interface";
import { RootState } from "~/redux/store";

interface Props {
  user: User;
}

const PostStatus = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container flex gap-2 p-3 shadow">
      <CircleAvatar src={"/images/avatar.jpg"} />
      <button className="flex flex-1 items-center rounded-full bg-primary pl-3 text-secondary-content hover:bg-hover">
        What&apos;s on your mind,
      </button>
    </div>
  );
};
export default PostStatus;
