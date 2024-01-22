import { LikeType } from "./post.interface";

export interface Modal {
  isUsed: boolean;
  type?: string;
  title?: string;
  data?: any;
}

export interface Emoji {
  gif: string;
  title: string;
  type: LikeType;
  icon: string;
}
