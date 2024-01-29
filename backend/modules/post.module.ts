import { Module } from '@nestjs/common';
import { PostController } from 'controllers/post.controller';
import { NotificationService } from 'services/notification.service';
import { PostService } from 'services/post.service';
import { PrismaService } from 'services/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, NotificationService],
})
export class PostModule {}
