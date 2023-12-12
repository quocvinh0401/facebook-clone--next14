import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from 'security/guards/auth.guard';
import { UserService } from 'services/user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly service: UserService) {}
}
