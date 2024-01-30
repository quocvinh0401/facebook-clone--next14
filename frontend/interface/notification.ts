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
  extra?: any;
}

export interface NotificationDataObject {
  id: number;
  name: string;
  type: NotificationDataObjectType;
  image?: string;
}

export enum NotificationStatus {
  UNSEEN_AND_UNREAD = "UNSEEN_AND_UNREAD",
  SEEN_AND_UNREADv = "SEEN_AND_UNREAD",
  SEEN_AND_READ = "SEEN_AND_READ",
}

export enum NotificationType {
  REACT_POST = "REACT_POST",
}

export enum NotificationDataObjectType {
  USER = "USER",
  POST = "POST",
  COMMENT = "COMMENT",
  GROUP = "GROUP",
}
