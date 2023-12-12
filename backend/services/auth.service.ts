import { BadRequestException, Injectable } from '@nestjs/common';
import { Service } from './supports/service';
import { PrismaService } from './prisma.service';
import { UserMapper } from 'data/mappers/user.mapper';
import { User } from 'data/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthDTO } from 'data/dtos/auth.dto';
import { isEmail, isPhone } from 'utils/utility';
import { JwtService } from '@nestjs/jwt';
import { Builder } from 'builder-pattern';
import { Payload } from 'security/payload';

@Injectable()
export class AuthService extends Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async signUp(payload: User) {
    try {
      const {
        first_name,
        surname,
        avatar,
        dob,
        email,
        gender,
        password,
        phone,
      } = payload;

      const saltOrRounds = 10;
      const hashPassword = await hash(password, saltOrRounds);

      const user = (await this.prisma.user.create({
        data: {
          first_name,
          surname,
          avatar,
          dob,
          email,
          gender,
          password: hashPassword,
          phone,
        },
      })) as unknown as User;

      return this.mapper.toDTO(user);
    } catch (error) {
      this.logger.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          if (error.meta.target == 'phone') {
            throw new BadRequestException(`Phone is existed`);
          } else if (error.meta.target == 'email') {
            throw new BadRequestException(`Email is existed`);
          }
        }
      }

      throw new BadRequestException(`Sign up error::: ${error}`);
    }
  }

  async signIn(dto: AuthDTO) {
    const where = {};

    if (isEmail(dto.login)) where['email'] = dto.login;
    else if (isPhone(dto.login)) where['phone'] = dto.login;
    else throw new BadRequestException('Phone or email is invalid');

    const user = (await this.prisma.user.findFirst({ where })) as User;

    if (user) {
      if (await compare(dto.password, user.password)) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            loginFail: 0,
            lastLogin: new Date(),
          },
        });

        const payload = Builder<Payload>()
          .first_name(user.first_name)
          .surname(user.surname)
          .email(user.email)
          .phone(user.phone)
          .dob(user.dob)
          .build();

        return [this.jwtService.sign(payload), this.mapper.toDTO(user)];
      } else {
        //handle when login fail many times

        if (!user.loginFail) user.loginFail;
        user.loginFail++;

        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            loginFail: user.loginFail,
            lastLogin: new Date(),
          },
        });

        throw new BadRequestException('Login fail');
      }
    } else {
      throw new BadRequestException('Your phone number or email is invalid');
    }
  }

  async getCurrentUser(dto: Payload) {
    try {
      const where = {};
      if (dto.phone) where['phone'] = dto.phone;
      if (dto.email) where['email'] = dto.email;
      const user = await this.prisma.user.findFirstOrThrow({ where });
      return this.mapper.toDTO(user);
    } catch (error) {
      throw new BadRequestException('Your login is expired');
    }
  }
}
