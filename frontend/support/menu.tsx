import { IconWorld } from "@tabler/icons-react";
import {
  BsFillPeopleFill,
  BsFillPersonDashFill,
  BsFillPersonFill,
  BsFillLockFill,
} from "react-icons/bs";
import { Builder } from "builder-pattern";
import {
  LikeType,
  PostAudience,
  PostAudienceType,
} from "~/interface/post.interface";
import { Emoji } from "~/interface/support.interface";

export const postAudiences: PostAudience[] = [
  Builder<PostAudience>()
    .type(PostAudienceType.PUBLIC)
    .text("Public")
    .Icon(IconWorld)
    .build(),
  Builder<PostAudience>()
    .type(PostAudienceType.FRIEND)
    .text("Friends")
    .Icon(BsFillPeopleFill)
    .build(),
  Builder<PostAudience>()
    .type(PostAudienceType.EXCEPT)
    .text("Friends except")
    .Icon(BsFillPersonDashFill)
    .build(),
  Builder<PostAudience>()
    .type(PostAudienceType.SPECIFIC)
    .text("Specific friends")
    .Icon(BsFillPersonFill)
    .build(),
  Builder<PostAudience>()
    .type(PostAudienceType.ONLY_ME)
    .text("Only me")
    .Icon(BsFillLockFill)
    .build(),
];

export const emojis: Emoji[] = [
  Builder<Emoji>()
    .title("Like")
    .gif("/gif/like.gif")
    .type(LikeType.LIKE)
    .icon("/images/emoji/like.png")
    .build(),
  Builder<Emoji>()
    .title("Care")
    .gif("/gif/care.gif")
    .type(LikeType.CARE)
    .icon("/images/emoji/care.png")
    .build(),
  Builder<Emoji>()
    .title("Wow")
    .gif("/gif/wow.gif")
    .type(LikeType.WOW)
    .icon("/images/emoji/wow.png")
    .build(),
  Builder<Emoji>()
    .title("Haha")
    .gif("/gif/haha.gif")
    .type(LikeType.HAHA)
    .icon("/images/emoji/haha.png")
    .build(),
  Builder<Emoji>()
    .title("Angry")
    .gif("/gif/angry.gif")
    .type(LikeType.ANGRY)
    .icon("/images/emoji/angry.png")
    .build(),
];
