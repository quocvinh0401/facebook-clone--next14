import Link from "next/link";
import { memo, useState } from "react";
import CircleAvatar from "~/components/supports/CircleAvatar";
import { Notification, NotificationStatus } from "~/interface/notification";
import { messageNotificationTemplate } from "~/support/dictionary";
import { changeFormDate, cn } from "~/utils/utility";

interface HeaderRightNotificationProps {
  notifications: Notification[];
}

const HeaderRightNotification = ({
  notifications,
}: HeaderRightNotificationProps) => {
  const [mode, setMode] = useState("all");

  const modes = ["all", "unread"];
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-2">
        {modes.map((m, index) => (
          <button
            key={index}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full px-3 py-2 font-medium capitalize hover:bg-hover-overlay",
              m == mode &&
                "bg-secondary-100 text-secondary hover:bg-secondary-button",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <div>
        <div className="flex justify-between">
          <span className="font-semibold">Earlier</span>
          <button className="rounded p-1 text-secondary hover:bg-hover-overlay">
            See all
          </button>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <Link
              href={notification.url ?? "/"}
              key={index}
              className="flex gap-3 rounded p-3 hover:bg-hover-overlay"
            >
              <CircleAvatar
                src={notification.data.direct_object.image}
                size={56}
              />
              <div className="flex flex-1 items-center gap-3">
                <div className="flex flex-1 flex-col justify-start gap-0.5">
                  <div className="flex flex-1 flex-col break-keep text-m">
                    {messageNotificationTemplate[notification.type](
                      notification,
                    )}
                  </div>
                  <div
                    className={cn(
                      "text-sm",
                      notification.status != NotificationStatus.SEEN_AND_READ
                        ? "font-semibold text-secondary"
                        : "text-secondary-content",
                    )}
                  >
                    {changeFormDate(
                      notification.updated_at ?? notification.created_at,
                    )}
                  </div>
                </div>
                <div
                  className={cn(
                    "h-3 w-3  rounded-full",
                    notification.status != NotificationStatus.SEEN_AND_READ &&
                      "bg-secondary",
                  )}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(HeaderRightNotification);
