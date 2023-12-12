import { UserDTO } from 'data/dtos/user.dto';
import { Mapper } from './support/mapper';
import { User } from 'data/entities/user.entity';
import { Builder } from 'builder-pattern';

export class UserMapper implements Mapper<UserDTO, User> {
  toDTO(entity: User): UserDTO {
    const dto = Builder<UserDTO>().build();

    for (const [key, value] of Object.entries(entity)) {
      if (key != 'password') dto[key] = value;
    }
    return dto;
  }
  toEntity(dto: UserDTO): User {
    return Builder<User>().build();
  }
}
