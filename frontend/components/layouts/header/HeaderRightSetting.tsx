import { Builder } from "builder-pattern";
import { memo } from "react";
import { IconType } from "react-icons";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "~/redux/slices/auth.slice";
import { RootState } from "~/redux/store";

interface Setting {
  key: string;
  text: string;
  Icon: IconType;
}

const HeaderRightSetting = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const settings: Setting[] = [
    Builder<Setting>().key("setting").Icon(TbLogout).text("Log out").build(),
  ];

  const handleClick = (key: string) => {
    if (key == "setting") handleLogout();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {settings.map((setting, index) => (
        <button
          onClick={() => handleClick(setting.key)}
          key={index}
          className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-hover-overlay"
        >
          <div className="flex items-center justify-center rounded-full bg-secondary-button p-2">
            <setting.Icon size={20} />
          </div>
          <span className="font-bold">{setting.text}</span>
        </button>
      ))}
    </div>
  );
};
export default memo(HeaderRightSetting);
