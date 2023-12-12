import { IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
