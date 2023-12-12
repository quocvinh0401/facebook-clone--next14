import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthDTO } from 'data/dtos/auth.dto';
import { User } from 'data/entities/user.entity';
import { AuthUser } from 'security/decorators/auth-user.decorator';
import { AuthGuard } from 'security/guards/auth.guard';
import { Payload } from 'security/payload';
import { AuthService } from 'services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() payload: AuthDTO) {
    return this.service.signIn(payload);
  }

  @Post('sign-up')
  async signUp(@Body() user: User) {
    return this.service.signUp(user);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  async getCurrentUser(@AuthUser() payload: Payload) {
    return this.service.getCurrentUser(payload);
  }
}
