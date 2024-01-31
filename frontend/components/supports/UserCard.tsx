import { useSelector } from "react-redux";
import CircleAvatar from "./CircleAvatar";
import { RootState } from "~/redux/store";

const UserCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <button className="flex w-full items-center space-x-2 rounded-lg p-2 hover:bg-hover">
      <CircleAvatar src={user?.avatar || "/images/avatar.jpg"} size={36} />
      <span className="text-m font-medium">{`${user?.first_name} ${user?.surname}`}</span>
    </button>
  );
};
export default UserCard;
