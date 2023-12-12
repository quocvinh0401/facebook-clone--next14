import { Injectable } from '@nestjs/common';
import { Service } from './supports/service';
import { PrismaService } from './prisma.service';
import { UserMapper } from 'data/mappers/user.mapper';

@Injectable()
export class UserService extends Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: UserMapper,
  ) {
    super();
  }
}
