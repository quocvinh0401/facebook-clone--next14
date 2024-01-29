import {
  NotificationDataObjectType,
  NotificationStatus,
  NotificationType,
} from 'data/enum/notification.enum';

export interface Notification {
  id: number;
  type: NotificationType;
  data: NotificationData;
  status: NotificationStatus;
  url?: string;
  updated_at: Date;
  created_at: Date;
}

export interface NotificationData {
  subjects: NotificationDataObject[];
  subject_count: number;
  direct_object: NotificationDataObject;
  indirect_object: NotificationDataObject;
  prepositional_object: NotificationDataObject;
  notifiers: number[];
  extra?: any;
}

export interface NotificationDataObject {
  id: number;
  name: string;
  type: NotificationDataObjectType;
  image?: string;
}
