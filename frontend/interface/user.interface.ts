import { PostAudienceType } from "./post.interface";

export interface User {
  first_name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  dob: Date;
  gender: string;
  avatar?: string;
  created_at: Date;
  post_audience_type: PostAudienceType;
}
