import { Module } from '@nestjs/common';
import { NotificationController } from 'controllers/notification.controller';
import { NotificationService } from 'services/notification.service';
import { PrismaService } from 'services/prisma.service';

@Module({
  providers: [NotificationService, PrismaService],
  controllers: [NotificationController],
})
export class NotificationModule {}
