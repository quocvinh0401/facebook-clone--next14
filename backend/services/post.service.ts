import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PostDTO } from 'data/dtos/post.dto';
import { Payload } from 'security/payload';
import { whereUser } from 'utils/utility';
import { Builder } from 'builder-pattern';
import { PostMediaDTO } from 'data/dtos/post.media.dto';
import { PostAudienceType } from '@prisma/client';
import { PostLikeDTO } from 'data/dtos/post.like.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async handleLike(dto: PostLikeDTO) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: dto.post_id,
      },
    });

    if (dto.id) {
      const like = await this.prismaService.postLike.findUnique({
        where: {
          id: dto.id,
        },
      });
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
      return await this.prismaService.postLike.update({
        data: {
          type: dto.type,
          is_like: dto.is_like,
        },
        where: {
          id: dto.id,
        },
      });
    } else {
      const newLike = await this.prismaService.postLike.create({
        data: {
          type: dto.type,
          is_like: dto.is_like,
          user_id: dto.user_id,
          post_id: dto.post_id,
        },
      });

      await this.prismaService.post.update({
        where: {
          id: post.id,
        },
        data: {
          count_like: post.count_like + 1,
        },
      });
      return newLike;
    }
  }
}
