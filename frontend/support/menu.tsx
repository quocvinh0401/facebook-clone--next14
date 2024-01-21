import { IconWorld } from "@tabler/icons-react";
import {
  BsFillPeopleFill,
  BsFillPersonDashFill,
  BsFillPersonFill,
  BsFillLockFill,
} from "react-icons/bs";
import { Builder } from "builder-pattern";
import { PostAudience, PostAudienceType } from "~/interface/post.interface";

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
