import { Builder } from 'builder-pattern';
import { NotificationDataObjectType } from 'data/enum/notification.enum';
import { Notification } from 'data/interfaces/notification.interface';
import { Payload } from 'security/payload';

export const isEmail = (str: string) => {
  return str.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const isPhone = (str: string) => {
  return str.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
};

export const whereUser = (payload: Payload): any => {
  const where = {};
  if (payload.email) where['email'] = payload.email;
  if (payload.phone) where['phone'] = payload.phone;

  return where;
};

export const ms = (data: any) => Builder<MessageEvent>().data(data).build();

export const getUrlNotification = (notification: Notification): string => {
  const directObjectType = notification.data.direct_object.type;
  let url = '';

  if (directObjectType == NotificationDataObjectType.POST) {
    url = `/posts/${notification.data.direct_object.id}`;
  }

  return url;
};
