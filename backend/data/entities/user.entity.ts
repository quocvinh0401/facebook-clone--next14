import { UserDTO } from 'data/dtos/user.dto';

export class User implements UserDTO {
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
