export enum PUSH_EVENT_TYPE {
  REACT_POST = 'REACT_POST',
}

export interface PushEvent {
  type: PUSH_EVENT_TYPE;
  data: any;
}

export interface AlarmUser {
  unseen_message_count: number;
  unseen_notification_count: number;
}
