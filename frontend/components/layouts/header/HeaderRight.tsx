"use client";
import { memo, useEffect, useState } from "react";
import { FaBell, FaFacebookMessenger } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import CircleAvatar from "~/components/supports/CircleAvatar";
import { usePatch } from "~/hooks/use-api";
import { useFetchWithCredentials } from "~/hooks/use-fetch-with-credentials";
import { Notification } from "~/interface/notification";
import { Query } from "~/interface/support.interface";
import { setAlarm } from "~/redux/slices/alarm.slice";
import { RootState } from "~/redux/store";
import { emitter } from "~/utils/emitter";
import { cn } from "~/utils/utility";
import HeaderRightNotification from "./HeaderRightNotification";
import HeaderRightSetting from "./HeaderRightSetting";

const HeaderRight = () => {
  const [tabOpen, setTabOpen] = useState("");
  const [query, setQuery] = useState<Query>({
    filters: { status: "all" },
    pagination: { page: 1, size: 10 },
  });
  const {
    data: notifications,
    isLoading,
    refresh,
  } = useFetchWithCredentials<Notification[]>("notification", query);
  const patchNotification = usePatch("notifications", {
    alert: { isUsed: false },
  });

  const { unseen_message_count, unseen_notification_count } = useSelector(
    (state: RootState) => state.alarm,
  );
  const dispatch = useDispatch();

  const buttons = [
    { Icon: HiMenu, value: "menu", title: "Menu" },
    {
      Icon: FaFacebookMessenger,
      value: "messenger",
      title: "Chats",
      badge: unseen_message_count,
    },
    {
      Icon: FaBell,
      value: "notification",
      title: "Notifications",
      badge: unseen_notification_count,
    },
  ];
  const handleOpenTab = async (value: string) => {
    setTabOpen(tabOpen == value ? "" : value);

    dispatch(setAlarm({ unseen_message_count, unseen_notification_count: 0 }));
    if (value == "notification" && unseen_notification_count > 0) {
      await patchNotification();
    }
  };

  const handleAddNotification = (notification: Notification) => {
    const existNotification = notifications?.findIndex(
      (n) => n.id == notification.id,
    );

    if (existNotification) notifications?.splice(existNotification, 1);
    notifications?.unshift(notification);
    dispatch(
      setAlarm({
        unseen_notification_count: unseen_notification_count + 1,
        unseen_message_count,
      }),
    );
  };

  useEffect(() => {
    const event = emitter.addListener(
      "add-notification",
      handleAddNotification,
    );
    return () => event.remove();
  }, [unseen_notification_count, unseen_message_count]);

  return (
    <div className="relative flex flex-1 items-center justify-end">
      <div className="flex space-x-2">
        {buttons.map((button, index) => (
          <button key={index} className="relative">
            <div
              onClick={() => handleOpenTab(button.value)}
              className={cn(
                "relative rounded-full p-2.5",
                tabOpen == button.value
                  ? "bg-secondary-100"
                  : "bg-secondary-button",
              )}
            >
              <button.Icon
                className={cn(
                  "h-5 w-5",
                  tabOpen == button.value && "fill-secondary",
                )}
              />
            </div>
            {button.badge ? (
              <div className="absolute -right-1 -top-1 z-10 aspect-square w-5 rounded-full bg-red-500 text-s font-semibold text-white">
                {button.badge}
              </div>
            ) : (
              <></>
            )}
          </button>
        ))}
        <button onClick={() => handleOpenTab("setting")}>
          <CircleAvatar src="/images/avatar.jpg" />
        </button>
      </div>
      {tabOpen && (
        <div className="absolute right-0 top-full w-[360px] rounded-lg bg-white px-3 py-2 shadow-container">
          <h2 className="text-xl font-bold">
            {buttons.find((b) => b.value == tabOpen)?.title}
          </h2>
          {tabOpen == "notification" ? (
            isLoading ? (
              <div>Loading ...</div>
            ) : (
              <HeaderRightNotification notifications={notifications!} />
            )
          ) : tabOpen == "setting" ? (
            <HeaderRightSetting />
          ) : (
            <div>Coming soon...</div>
          )}
        </div>
      )}
    </div>
  );
};
export default memo(HeaderRight);
