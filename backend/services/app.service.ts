import { Injectable, Logger } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { OnlineUser } from 'data/interfaces/auth.interface';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Payload } from 'security/payload';
import { SessionService } from './session.service';
import { PrismaService } from './prisma.service';
import { NotificationStatus } from 'data/enum/notification.enum';
import { AlarmUser } from 'data/interfaces/app.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly prismaService: PrismaService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  initOnlineUser(payload: Payload, id: string): Observable<MessageEvent> {
    const user: OnlineUser = Builder<OnlineUser>()
      .id(payload.id)
      .email(payload.email)
      .phone(payload.phone)
      .sessionId(id)
      .subject(new Subject())
      .build();

    this.sessionService.addSession(user);

    return user.subject.pipe(
      catchError((error) => {
        this.logger.error('event error:::', error);
        return throwError(() => new Error('event error'));
      }),
    );
  }

  removeOnlineUser(id: number) {
    return this.sessionService.removeSession(id);
  }

  async getAlarm(payload: Payload) {
    const notificationCount = await this.prismaService.notification.count({
      where: {
        notifiers: {
          has: payload.id,
        },
        status: NotificationStatus.UNSEEN_AND_UNREAD,
      },
    });

    return Builder<AlarmUser>()
      .unseen_notification_count(notificationCount)
      .build();
  }
}
