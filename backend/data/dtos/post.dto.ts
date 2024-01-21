import { PostAudienceType, PostType } from 'data/enum/post.enum';
import { UserDTO } from './user.dto';
import { PostMediaDTO } from './post.media.dto';
import { PostLikeDTO } from './post.like.dto';

export class PostDTO {
  id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  caption: string;
  type: PostType;
  audience: PostAudienceType;

  count_comment: number;
  count_like: number;

  medias?: PostMediaDTO[];
  comments?: Comment[];
  likes?: PostLikeDTO[];
  user?: UserDTO;
}
