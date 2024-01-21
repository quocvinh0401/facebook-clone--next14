import { UserDTO } from 'data/dtos/user.dto';
import { PostAudienceType } from 'data/enum/post.enum';

export class User implements UserDTO {
  created_at: Date;
  post_audience_type: PostAudienceType;
  lastLogin: Date;
  loginFail: number;
  id: number;
  phone: string;
  first_name: string;
  surname: string;
  dob: Date;
  gender: string;
  avatar: string;
  password: string;
  email: string;
}
