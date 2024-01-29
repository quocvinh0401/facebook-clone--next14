import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Builder } from 'builder-pattern';
import { PostLikeDTO } from 'data/dtos/post.like.dto';
import { PUSH_EVENT_TYPE, PushEvent } from 'data/interfaces/app.interface';
import { OnlineUser } from 'data/interfaces/auth.interface';
import { Notification } from 'data/interfaces/notification.interface';
import { cloneDeep, remove } from 'lodash';
import { ms } from 'utils/utility';

@Injectable()
export class SessionService {
  private sessions: OnlineUser[] = [];
  private readonly logger = new Logger(SessionService.name);

  addSession(session: OnlineUser) {
    const existSession = this.sessions.find((s) => s.id == session.id);

    if (!existSession) this.sessions.push(session);
    return session;
  }

  removeSession(id: number) {
    remove(this.sessions, (session) => session.id == id);
  }

  toSession(id: number, event: PushEvent) {
    try {
      const session = this.sessions.find((s) => s.id == id);

      if (session) {
        session.subject.next(ms(event));
      }
    } catch (error) {
      this.logger.error('to session error::::', error);
    }
  }

  @OnEvent(PUSH_EVENT_TYPE.REACT_POST)
  handleLike(event: PushEvent) {
    const data = cloneDeep(event.data) as Notification;
    this.toSession(
      data.data.prepositional_object.id,
      Builder<PushEvent>().data(data).type(PUSH_EVENT_TYPE.REACT_POST).build(),
    );
  }
}
