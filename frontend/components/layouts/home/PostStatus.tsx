"use client";

import { IconCaretDownFilled, IconPhoto, IconX } from "@tabler/icons-react";
import { Builder } from "builder-pattern";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircleAvatar from "~/components/supports/CircleAvatar";
import Editor from "~/components/supports/Editor";
import Modal from "~/components/supports/Modal";
import { usePatch, usePost, useUploadFile } from "~/hooks/use-api";
import {
  PostMedia,
  MediaType,
  Post,
  PostAudienceType,
  PostType,
} from "~/interface/post.interface";
import { setModal, updateData } from "~/redux/slices/modal.slice";
import { updatePostAudienceType } from "~/redux/slices/user.slice";
import { RootState } from "~/redux/store";
import { postAudiences } from "~/support/menu";
import { cn } from "~/utils/utility";

import { HiPencil } from "react-icons/hi";
import { TbPhotoPlus, TbX } from "react-icons/tb";
import GridMedia from "~/components/supports/GridMedia";

const PostStatus = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { type, data } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(
      setModal({
        isUsed: true,
        title: "Create Post",
        type: "create",
        data: { form: new FormData(), post: { caption: "", medias: [] } },
      }),
    );
  };

  const onBack = () => {
    dispatch(
      setModal({
        isUsed: true,
        title: "Create Post",
        type: "create",
        data,
      }),
    );
  };

  return (
    <>
      <div className="container flex gap-2 p-3 shadow">
        <CircleAvatar src={user?.avatar || "/images/avatar.jpg"} />
        <button
          onClick={openModal}
          className="flex flex-1 items-center rounded-full bg-primary pl-3 text-secondary-content hover:bg-hover"
        >
          What&apos;s on your mind, {user?.surname} ?
        </button>
      </div>
      {type == "create" ? (
        <Modal>
          <CreatePost />
        </Modal>
      ) : type == "audience" ? (
        <Modal onBack={onBack}>
          <PostAudience />
        </Modal>
      ) : (
        <Modal onBack={onBack}>
          <EditMedia />
        </Modal>
      )}
    </>
  );
};

const CreatePost = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const modal = useSelector((state: RootState) => state.modal);
  const { post, form } = modal.data as { post: Post; form: FormData };

  const dispatch = useDispatch();

  const [imageActive, setImageActive] = useState(post.medias!.length > 0);

  const upload = useUploadFile("files");
  const postPost = usePost("post", { alert: { isUsed: false } });

  const chooseMedia = async (e: any) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        form.append("files", files[i]);
      }

      const medias: PostMedia[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const blob = URL.createObjectURL(file);
        const media: PostMedia = Builder<PostMedia>()
          .type(file.type)
          .url(blob)
          .caption("")
          .build();
        medias.push(media);
      }
      dispatch(
        updateData({
          form,
          post: { ...post, medias: [...post.medias!, ...medias] },
        }),
      );
    }
  };

  const updateCaption = (caption: string) => {
    dispatch(updateData({ form, post: { ...post, caption } }));
  };

  const submit = async () => {
    const urls = (await upload(form)) as string[];
    const medias = structuredClone(post.medias!);
    for (let i = 0; i < medias.length; i++) {
      medias[i].url = urls[i];
    }

    const type = medias.some((media) => media.type.startsWith("video"))
      ? PostType.VIDEO
      : PostType.NORMAL;

    const _post = Builder<Post>()
      .caption(post.caption)
      .audience(user.post_audience_type)
      .type(type)
      .medias(medias)
      .build();

    await postPost(_post);

    dispatch(
      setModal({
        isUsed: false,
        data: { form: new FormData(), post: { caption: "", medias: [] } },
      }),
    );
  };

  const changeAudienceView = () => {
    dispatch(
      setModal({
        isUsed: true,
        title: "Post Audience",
        type: "audience",
        data: modal.data,
      }),
    );
  };

  const closeMedia = () => {
    setImageActive(false);
    dispatch(
      updateData({ form: new FormData(), post: { caption: "", medias: [] } }),
    );
  };

  const editMedia = () => {
    dispatch(
      setModal({
        isUsed: true,
        data: modal.data,
        title: "Photos/Videos",
        type: "edit",
      }),
    );
  };

  return (
    <div className="w-[500px] space-y-4 p-4">
      <div className="flex items-center gap-4">
        <CircleAvatar src={user?.avatar} />
        <div>
          <div className="text-start text-m font-semibold">{`${user?.first_name} ${user?.surname}`}</div>
          {postAudiences
            .filter((audience) => audience.type == user?.post_audience_type)
            ?.map((audience, index) => (
              <button
                key={index}
                className="flex items-center gap-1 rounded-md bg-secondary-button p-1"
                onClick={changeAudienceView}
              >
                <audience.Icon width={12} height={12} />
                <span className="text-s font-semibold">{audience.text}</span>
                <IconCaretDownFilled width={12} height={12} />
              </button>
            ))}
        </div>
      </div>
      <div className="max-h-[480px] overflow-hidden overflow-y-auto">
        <Editor value={post.caption} setValue={updateCaption} />
        {imageActive ? (
          <div className="rounded-lg border border-divider p-3">
            <div className="relative">
              {post.medias?.length != 0 ? (
                <div className="group overflow-hidden rounded-lg">
                  <GridMedia medias={post.medias!} />
                  <div className="absolute left-0 top-0 hidden h-full w-full items-start gap-3 rounded-lg bg-black/10 p-3 group-hover:flex">
                    <button
                      className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 hover:opacity-80"
                      onClick={editMedia}
                    >
                      <HiPencil className="h-5 w-5" />
                      <span className="font-semibold">
                        {post.medias!.length > 1 ? "Edit All" : "Edit"}
                      </span>
                    </button>
                    <label htmlFor="add-media">
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 hover:opacity-80">
                        <TbPhotoPlus className="h-5 w-5" />
                        <span className="font-semibold">Add Photos/Videos</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        id="add-media"
                        name="add-media"
                        className="hidden h-0 w-0"
                        onChange={chooseMedia}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label htmlFor="image">
                  <div className="relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-card-flat hover:bg-hover-overlay">
                    <div className="rounded-full bg-secondary-button p-2">
                      <TbPhotoPlus className="h-5 w-5" />
                    </div>
                    <span className="text-l font-medium">
                      Add Photos/Videos
                    </span>
                  </div>
                  <input
                    type="file"
                    id="image"
                    className="h-0 w-0"
                    hidden
                    multiple
                    onChange={chooseMedia}
                  />
                </label>
              )}
              <button
                className="absolute right-2 top-2 flex items-center justify-center rounded-full border border-divider bg-white p-1"
                onClick={closeMedia}
              >
                <IconX />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between rounded-lg border border-divider p-3">
        <span>Add to your post</span>
        <div className="flex ">
          <button
            className="rounded-full p-1 hover:bg-hover-overlay"
            onClick={() => !imageActive && setImageActive(!imageActive)}
          >
            <IconPhoto color="#42b72a" />
          </button>
        </div>
      </div>
      <button
        onClick={submit}
        className={cn(
          "w-full rounded-md py-1 text-m font-semibold",
          post.caption || post.medias!.length > 0
            ? "bg-secondary text-white"
            : "cursor-not-allowed bg-secondary-button text-content-button-disabled",
        )}
        disabled={!post.caption && post.medias!.length == 0}
      >
        Post
      </button>
    </div>
  );
};

const PostAudience = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { data } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const currentAudience = () =>
    postAudiences.find(
      (audience) => audience.type == user?.post_audience_type,
    )!;

  const [tempAudience, setTempAudience] = useState(currentAudience().type);
  const [defaultAudience, setDefaultAudience] = useState<boolean>(false);
  const patchUser = usePatch("user", { alert: { isUsed: false } });

  const updateAudience = async () => {
    dispatch(updatePostAudienceType({ post_audience_type: tempAudience }));

    if (defaultAudience) {
      await patchUser("update-post-audience-type", {
        post_audience_type: tempAudience,
      });
    }
    dispatch(
      setModal({ isUsed: true, title: "Create post", type: "create", data }),
    );
  };

  // const

  const changePostAudienceType = (type: PostAudienceType) =>
    setTempAudience(type);

  return (
    <div className="w-full max-w-[500px]">
      <div className="max-h-[467px] overflow-hidden overflow-y-auto p-4">
        <div className="text-l font-semibold text-primary-content">
          Who can see your post?
        </div>
        <div className="py-3 text-secondary-content">
          Your post will show up in Feed, on your profile and in search results.
        </div>
        <div className="py-3 text-secondary-content">
          Your default audience is set to{" "}
          <span className="font-semibold">{currentAudience()?.text}</span>, but
          you can change the audience of this specific post.
        </div>
        <div>
          {postAudiences.map((audience, index) => (
            <label
              key={index}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-3",
                tempAudience == audience.type
                  ? "bg-secondary-100"
                  : "hover:bg-hover-overlay",
              )}
            >
              <div className="rounded-full bg-secondary-button p-[18px]">
                <audience.Icon size={24} />
              </div>
              <div className="flex-1 text-l font-semibold">{audience.text}</div>
              <input
                type="radio"
                name="audience"
                value={audience.type}
                className="h-5 w-5"
                checked={tempAudience == audience.type}
                onChange={() => changePostAudienceType(audience.type)}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="p-3">
        <button
          className="flex items-center gap-3"
          onClick={() => setDefaultAudience(!defaultAudience)}
        >
          <input
            type="checkbox"
            id=""
            className="h-6 w-6"
            checked={
              tempAudience == user?.post_audience_type || defaultAudience
            }
            disabled={tempAudience == user?.post_audience_type}
          />
          <span
            className={cn(
              "font-semibold",
              tempAudience == user?.post_audience_type &&
                "text-content-button-disabled",
            )}
          >
            Set as default audience
          </span>
        </button>
        <div className="flex justify-end gap-3 ">
          <button className="rounded-lg px-3 py-2 font-semibold text-secondary hover:bg-hover-overlay">
            Cancel
          </button>
          <button
            className="rounded-lg bg-secondary px-10 py-2 font-semibold text-white"
            onClick={updateAudience}
          >
            {!defaultAudience || tempAudience == user.post_audience_type
              ? "Done"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const EditMedia = () => {
  const { data } = useSelector((state: RootState) => state.modal);
  const { post, form } = data as { post: Post; form: FormData };
  const { medias } = structuredClone(post);

  const dispatch = useDispatch();

  const changeCaption = (
    media: PostMedia,
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    const tempMedia = medias?.find((m) => m.url == media.url)!;
    tempMedia.caption = value;

    dispatch(updateData({ form, post: { ...post, medias } }));
  };

  const removeMedia = (index: number) => {
    medias?.splice(index, 1);
    dispatch(updateData({ form, post: { ...post, medias } }));
  };

  const handleSubmit = () => {
    dispatch(
      setModal({
        isUsed: true,
        title: "Create Post",
        type: "create",
        data: data,
      }),
    );
  };

  return (
    <div>
      <div
        className={cn(
          "grid gap-2 bg-secondary-button p-2",
          medias!.length > 2 && "grid-cols-2",
        )}
      >
        {medias?.map((media, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-sm">
            <div className="relative flex justify-center">
              {media.type == MediaType.IMAGE ? (
                <>
                  <Image
                    src={media.url}
                    width={0}
                    height={0}
                    className="relative z-10 h-auto max-h-[265px] w-auto max-w-[450px] object-cover"
                    alt=""
                  />
                  <Image
                    src={media.url}
                    width={0}
                    height={0}
                    className="absolute left-0 top-0 h-full w-full object-cover blur-lg"
                    alt=""
                  />
                </>
              ) : (
                <video
                  controls
                  className="h-auto max-h-[265px] w-auto max-w-[450px]"
                >
                  <source src={media.url} />
                </video>
              )}
              <button
                onClick={() => removeMedia(index)}
                className="absolute right-2 top-2 z-10 rounded-full bg-white p-2"
              >
                <TbX />
              </button>
            </div>
            <div className="relative bg-white p-2">
              <textarea
                placeholder="Caption"
                name=""
                id=""
                rows={2}
                className="w-full resize-none rounded-lg border p-2 outline-none"
                value={media.caption}
                onChange={(e) => changeCaption(media, e)}
              ></textarea>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 border-t p-3">
        {/* <label
          htmlFor="add"
          className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 hover:bg-hover-overlay"
        >
          <TbPhotoPlus className="h-5 w-5 stroke-secondary" />
          <span className="font-semibold text-secondary">
            Add Photos/Videos
          </span>
          <input type="file" className="hidden h-0 w-0" id="add" onChange={(e => addMedia(e))}/>
        </label> */}
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-secondary px-6 py-2 font-semibold text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
};
export default PostStatus;
