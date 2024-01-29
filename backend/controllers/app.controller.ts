import { Controller, Get, Query, Res, Sse, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { Payload } from 'security/payload';
import { AppService } from '../services/app.service';
import { AuthGuard } from 'security/guards/auth.guard';
import { AuthUser } from 'security/decorators/auth-user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Sse('/sse')
  push(
    @Query('jwt') jwt: string,
    @Query('sid') id: string,
    @Res() res: Response,
  ): Observable<MessageEvent> {
    const observable: Observable<MessageEvent> = of();

    if (jwt) {
      const payload = this.jwtService.decode(jwt) as Payload;
      res.on('close', () => {
        this.appService.removeOnlineUser(payload.id);
      });

      return this.appService.initOnlineUser(payload, id);
    }

    return observable;
  }

  @Get('alarm')
  @UseGuards(AuthGuard)
  async getAlarm(@AuthUser() payload: Payload) {
    return this.appService.getAlarm(payload);
  }
}
