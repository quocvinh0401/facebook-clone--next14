import { Injectable, Logger } from '@nestjs/common';
import { Service } from './supports/service';
import { PrismaService } from './prisma.service';
import { UserMapper } from 'data/mappers/user.mapper';
import { UserDTO } from 'data/dtos/user.dto';
import { Payload } from 'security/payload';
import { User } from 'data/entities/user.entity';

@Injectable()
export class UserService extends Service {
  logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {
    super();
  }

  async updatePostAudienceType(dto: UserDTO, payload: Payload) {
    try {
      const where: any = {};

      if (payload.email) where['email'] = payload.email;
      if (payload.phone) where['phone'] = payload.phone;

      const user = (await this.prisma.user.update({
        where,
        data: {
          post_audience_type: dto.post_audience_type,
        },
      })) as User;
      return this.mapper.toDTO(user);
    } catch (error) {
      this.logger.error('updatePostAudienceType error::', error);
    }
  }
}
