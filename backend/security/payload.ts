import { UserDTO } from 'data/dtos/user.dto';

export type Payload = Pick<
  UserDTO,
  'first_name' | 'surname' | 'dob' | 'email' | 'phone'
>;
