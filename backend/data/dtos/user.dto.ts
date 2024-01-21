import { PostAudienceType } from 'data/enum/post.enum';

export class UserDTO {
  id: number;
  email: string;
  password: string;
  phone: string;
  first_name: string;
  surname: string;
  dob: Date;
  gender: string;
  avatar: string;
  lastLogin: Date;
  loginFail: number;
  created_at: Date;
  post_audience_type: PostAudienceType;
}
