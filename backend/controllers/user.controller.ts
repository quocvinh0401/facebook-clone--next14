import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
import { UserDTO } from 'data/dtos/user.dto';
import { AuthUser } from 'security/decorators/auth-user.decorator';
import { AuthGuard } from 'security/guards/auth.guard';
import { Payload } from 'security/payload';
import { UserService } from 'services/user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Patch('update-post-audience-type')
  async updatePostAudienceType(
    @Body() dto: UserDTO,
    @AuthUser() payload: Payload,
  ) {
    return this.service.updatePostAudienceType(dto, payload);
  }
}
