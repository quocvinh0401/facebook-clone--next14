import { Module } from '@nestjs/common';
import { UserController } from 'controllers/user.controller';
import { UserMapper } from 'data/mappers/user.mapper';
import { PrismaService } from 'services/prisma.service';
import { UserService } from 'services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserMapper, PrismaService],
})
export class UserModule {}
