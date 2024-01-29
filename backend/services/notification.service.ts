import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostDTO } from 'data/dtos/post.dto';
import { PostLikeDTO } from 'data/dtos/post.like.dto';
import {
  NotificationDataObjectType,
  NotificationStatus,
  NotificationType,
} from 'data/enum/notification.enum';
import {
  Notification,
  NotificationDataObject,
} from 'data/interfaces/notification.interface';
import { Payload } from 'security/payload';
import { PrismaService } from './prisma.service';
import { Builder } from 'builder-pattern';
import { PUSH_EVENT_TYPE, PushEvent } from 'data/interfaces/app.interface';
import { Query } from 'data/interfaces/support.interface';
import { getUrlNotification } from 'utils/utility';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly emitter: EventEmitter2,
  ) {}

  async getAll(query: Query, payload: Payload) {
    const notifications = (await this.prismaService.notification.findMany({
      where: {
        notifiers: {
          has: payload.id,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })) as any[];

    notifications.forEach((notification: Notification) => {
      notification.url = getUrlNotification(notification);
    });

    return notifications;
  }

  async updateMany(payload: Payload) {
    try {
      const notifications = await this.prismaService.notification.updateMany({
        where: {
          notifiers: {
            has: payload.id,
          },
          status: NotificationStatus.UNSEEN_AND_UNREAD,
        },
        data: {
          status: NotificationStatus.SEEN_AND_UNREAD,
        },
      });
      return notifications;
    } catch (error) {
      this.logger.error('updateMany error::::', error);
    }
  }

  async handleLikePost(payload: Payload, like: PostLikeDTO, post: PostDTO) {
    let data: any;
    try {
      data = (await this.prismaService.notification.findFirst({
        where: {
          type: NotificationType.REACT_POST,
          data: {
            path: ['direct_object', 'id'],
            equals: post.id,
          },
        },
      })) as any;

      if (data) {
        const subjects = data.data['subjects'] as NotificationDataObject[];
        const existUser = subjects.findIndex(
          (subject) => subject.id == payload.id,
        );

        if (existUser > 0) subjects.splice(existUser, 1);
        if (existUser > 0 || existUser == -1) {
          subjects.unshift({
            id: payload.id,
            name: `${payload.first_name} ${payload.surname}`,
            type: NotificationDataObjectType.USER,
            image: payload.avatar,
          });
          if (existUser == -1) {
            data.data['subject_count']++;
            data.notifiers.push(payload.id);
          }
        }
        data.status = NotificationStatus.UNSEEN_AND_UNREAD;
        data = await this.prismaService.notification.update({
          where: {
            id: data.id,
          },
          data,
        });
      } else {
        data = await this.prismaService.notification.create({
          data: {
            type: NotificationType.REACT_POST,
            data: {
              subjects: [
                {
                  id: payload.id,
                  name: `${payload.first_name} ${payload.surname}`,
                  avatar: payload.avatar,
                  type: NotificationDataObjectType.USER,
                },
              ],
              subject_count: 1,
              direct_object: {
                id: post.id,
                name: post.caption ?? '',
                type: NotificationDataObjectType.POST,
              },
              prepositional_object: {
                id: post.user_id,
                name: `${post.user.first_name} ${post.user.surname}`,
                type: NotificationDataObjectType.USER,
              },
            },
            notifiers: [post.user_id],
          },
        });
      }
      const notification = Builder<Notification>()
        .status(data.status)
        .type(data.type)
        .id(data.id)
        .created_at(data.created_at)
        .updated_at(data.updated_at)
        .data(data.data)
        .url(`/post/${data.data.direct_object.id}`)
        .build();

      this.emitter.emit(
        PUSH_EVENT_TYPE.REACT_POST,
        Builder<PushEvent>().data(notification).build(),
      );
    } catch (error) {
      this.logger.error('notification react post error:::', error);
    }
  }
}
