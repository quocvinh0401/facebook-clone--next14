import { LikeType } from 'data/enum/post.enum';

export class PostLikeDTO {
  id: number;
  post_id: number;
  user_id: number;
  is_like: boolean;
  type: LikeType;
  created_at: Date;
  updated_at: Date;
}
