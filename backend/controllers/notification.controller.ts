import { Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { Query as iQuery } from 'data/interfaces/support.interface';
import { AuthUser } from 'security/decorators/auth-user.decorator';
import { AuthGuard } from 'security/guards/auth.guard';
import { Payload } from 'security/payload';
import { NotificationService } from 'services/notification.service';

@Controller(['notification', 'notifications'])
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get()
  async getAll(@Query() query: iQuery, @AuthUser() payload: Payload) {
    return this.service.getAll(query, payload);
  }

  @Patch()
  async updateMany(@AuthUser() payload: Payload) {
    return this.service.updateMany(payload);
  }
}
