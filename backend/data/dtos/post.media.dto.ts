import { MediaType } from 'data/enum/post.enum';

export class PostMediaDTO {
  id: number;
  type: MediaType;
  url: string;
  caption: string;
  post_id: number;
  created_at: Date;
}
