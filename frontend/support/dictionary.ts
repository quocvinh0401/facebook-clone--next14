import { Notification, NotificationType } from "~/interface/notification";

export const messageNotificationTemplate: Record<
  NotificationType,
  (notification: Notification) => string
> = {
  REACT_POST: (notification: Notification): string => {
    const { data } = notification;
    return `${data.subjects[0].name} ${
      data.subject_count > 1 ? `and ${data.subject_count - 1}` : ""
    } reacted to your post: "${data.direct_object.name}"`;
  },
};
