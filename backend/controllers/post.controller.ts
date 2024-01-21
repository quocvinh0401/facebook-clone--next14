import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostDTO } from 'data/dtos/post.dto';
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
}
