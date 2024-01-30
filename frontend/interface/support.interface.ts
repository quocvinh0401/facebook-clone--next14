import { IconType } from "react-icons";
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

export interface NavItem {
  text: string;
  Icon: IconType;
  IconActive: IconType;
  href: string;
}

export interface Query {
  filters: any;
  pagination: QueryPagination;
}

export interface QueryPagination {
  page: number;
  size: number;
}
