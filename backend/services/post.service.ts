import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostAudienceType } from '@prisma/client';
import { Builder } from 'builder-pattern';
import { PostDTO } from 'data/dtos/post.dto';
import { PostLikeDTO } from 'data/dtos/post.like.dto';
import { PostMediaDTO } from 'data/dtos/post.media.dto';
import { Payload } from 'security/payload';
import { whereUser } from 'utils/utility';
import { NotificationService } from './notification.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly emitter: EventEmitter2,
    private readonly notificationService: NotificationService,
  ) {}

  async create(dto: PostDTO, payload: Payload) {
    const user = await this.prismaService.user.findFirst({
      where: whereUser(payload),
    });

    const { caption, audience, type } = dto;
    const post = await this.prismaService.post.create({
      data: {
        caption,
        type,
        audience,
        user_id: user.id,
        medias: {
          createMany: {
            data: dto.medias.map((media) =>
              Builder<PostMediaDTO>()
                .url(media.url)
                .caption(media.caption)
                .type(media.type)
                .build(),
            ) as any,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return post;
  }

  async getAll(payload: Payload) {
    const user = await this.prismaService.user.findFirst({
      where: whereUser(payload),
    });

    const posts = await this.prismaService.post.findMany({
      where: {
        OR: [{ audience: PostAudienceType.PUBLIC }, { user_id: user.id }],
      },
      include: {
        user: {
          select: {
            id: true,
            avatar: true,
            first_name: true,
            surname: true,
          },
        },
        medias: true,
        likes: {
          where: {
            is_like: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return posts;
  }

  async getOne(id: number, payload: Payload) {
    try {
      const post = await this.prismaService.post.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          user: true,
          medias: true,
          likes: {
            where: {
              user_id: payload.id,
            },
          },
        },
      });

      return post;
    } catch (error) {
      this.logger.error('getOne post error::::', error);
    }
  }

  async handleLike(dto: PostLikeDTO, payload: Payload) {
    const post = (await this.prismaService.post.findUnique({
      where: {
        id: dto.post_id,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            surname: true,
          },
        },
      },
    })) as PostDTO;
    let like: PostLikeDTO | undefined = undefined;
    if (dto.id) {
      like = (await this.prismaService.postLike.findUnique({
        where: {
          id: dto.id,
        },
      })) as PostLikeDTO;
      if (dto.is_like != like.is_like) {
        await this.prismaService.post.update({
          where: {
            id: post.id,
          },
          data: {
            count_like: dto.is_like ? post.count_like + 1 : post.count_like - 1,
          },
        });
      }

      like = (await this.prismaService.postLike.update({
        data: {
          type: dto.type,
          is_like: dto.is_like,
        },
        where: {
          id: dto.id,
        },
      })) as PostLikeDTO;
    } else {
      like = (await this.prismaService.postLike.create({
        data: {
          type: dto.type,
          is_like: dto.is_like,
          user_id: dto.user_id,
          post_id: dto.post_id,
        },
      })) as PostLikeDTO;

      await this.prismaService.post.update({
        where: {
          id: post.id,
        },
        data: {
          count_like: post.count_like + 1,
        },
      });
    }

    if (like.is_like && payload.id != post.user_id) {
      await this.notificationService.handleLikePost(payload, like, post);
    }

    return like;
  }
}
