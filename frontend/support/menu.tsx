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
import { Emoji, NavItem } from "~/interface/support.interface";
import {
  MdOutlineHome,
  MdHome,
  MdOutlineVideoLibrary,
  MdVideoLibrary,
  MdVideogameAsset,
  MdOutlineVideogameAsset,
} from "react-icons/md";

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
    .gif("/gif/emoji/like.gif")
    .type(LikeType.LIKE)
    .icon("/images/emoji/like.gif")
    .build(),
  Builder<Emoji>()
    .title("Care")
    .gif("/gif/emoji/care.gif")
    .type(LikeType.CARE)
    .icon("/images/emoji/care.gif")
    .build(),
  Builder<Emoji>()
    .title("Wow")
    .gif("/gif/emoji/wow.gif")
    .type(LikeType.WOW)
    .icon("/images/emoji/wow.gif")
    .build(),
  Builder<Emoji>()
    .title("Haha")
    .gif("/gif/emoji/haha.gif")
    .type(LikeType.HAHA)
    .icon("/images/emoji/haha.gif")
    .build(),
  Builder<Emoji>()
    .title("Angry")
    .gif("/gif/emoji/angry.gif")
    .type(LikeType.ANGRY)
    .icon("/images/emoji/angry.gif")
    .build(),
];

export const navItems: NavItem[] = [
  Builder<NavItem>()
    .text("home")
    .href("/")
    .Icon(MdOutlineHome)
    .IconActive(MdHome)
    .build(),
  Builder<NavItem>()
    .text("video")
    .href("/watch")
    .Icon(MdOutlineVideoLibrary)
    .IconActive(MdVideoLibrary)
    .build(),
  Builder<NavItem>()
    .text("gaming")
    .href("/gaming")
    .Icon(MdOutlineVideogameAsset)
    .IconActive(MdVideogameAsset)
    .build(),
];
