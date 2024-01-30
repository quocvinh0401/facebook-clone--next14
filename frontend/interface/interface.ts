export interface PushEvent {
  data: any;
  type: PushEventType;
}

export enum PushEventType {
  REACT_POST,
}

export interface AlarmUser {
  unseen_notification_count: number;
  unseen_message_count: number;
}
