import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostDTO } from 'data/dtos/post.dto';
import { PostLikeDTO } from 'data/dtos/post.like.dto';
import { AuthUser } from 'security/decorators/auth-user.decorator';
import { AuthGuard } from 'security/guards/auth.guard';
import { Payload } from 'security/payload';
import { PostService } from 'services/post.service';

@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post()
  async create(@Body() dto: PostDTO, @AuthUser() payload: Payload) {
    return this.service.create(dto, payload);
  }

  @Get()
  async getAll(@AuthUser() payload: Payload) {
    return this.service.getAll(payload);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @AuthUser() payload: Payload) {
    return this.service.getOne(+id, payload);
  }

  @Patch('like')
  async handleLike(@Body() like: PostLikeDTO, @AuthUser() payload: Payload) {
    return this.service.handleLike(like, payload);
  }
}
