import { User } from "./user.interface";

export interface Post {
  id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  caption: string;
  type: PostType;
  audience: PostAudienceType;

  count_comment: number;
  count_like: number;

  medias?: PostMedia[];
  comments?: PostComment[];
  likes?: PostLike[];
  user?: User;
}

export interface PostMedia {
  id: number;
  type: MediaType;
  url: string;
  caption: string;
  post_id: number;
  created_at: Date;
}

export interface PostComment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface PostLike {
  id: number;
  post_id: number;
  user_id: number;
  is_like: boolean;
  type: LikeType;
  created_at: Date;
  updated_at: Date;
}

export interface PostAudience {
  type: PostAudienceType;
  text: string;
  Icon: any;
}

export enum LikeType {
  LIKE = "LIKE",
  LOVE = "LOVE",
  CARE = "CARE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export enum PostType {
  NORMAL = "NORMAL",
  VIDEO = "VIDEO",
}

export enum PostAudienceType {
  PUBLIC = "PUBLIC",
  FRIEND = "FRIEND",
  EXCEPT = "EXCEPT",
  SPECIFIC = "SPECIFIC",
  ONLY_ME = "ONLY_ME",
}
