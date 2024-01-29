import { UserDTO } from 'data/dtos/user.dto';

export type Payload = Pick<
  UserDTO,
  'id' | 'first_name' | 'surname' | 'dob' | 'email' | 'phone' | 'avatar'
>;
