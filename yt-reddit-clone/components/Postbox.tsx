import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { client } from "../apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import Avatar from "./Avatar";

// Define FormData type
type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};

function Postbox({ subreddit }: Props) {
  const [imageBoxOpen, setImageBoxOpen] = React.useState(false);
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  // Get session from NextAuth
  const { data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Posting...");
    try {
      // Query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: { topic: formData.subreddit },
      });

      console.log(getSubredditListByTopic);
      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        // Create the subreddit....
        console.log("This subreddit is new, creating it...");

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log("Creating subreddit! ", formData);
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("NEW POST ADDED: ", newPost);
      } else {
        // Use existing subreddit
        console.log("USE EXISTING SUBREDDIT");
        console.log(getSubredditListByTopic);

        const image = formData.postImage || "";
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("NEW POST ADDED: ", newPost);
      }

      // After the post has been added
      // Reset the form fields
      setValue("postTitle", "");
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("subreddit", "");

      toast.success("New post created!", {
        id: notification,
      });
    } catch (e) {
      // Print the error trace
      console.error(e);

      // Toast an error
      toast.error("Error creating post!", {
        id: notification,
      });
    }
  });

  return (
    <form
      className=" top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
      onSubmit={onSubmit}
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          type="text"
          className={`flex-1 bg-gray-100 p-2 pl-5 outline-none`}
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : `Create a post by entering a title!`
              : `Sign in to post!`
          }
        />
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body: </p>
            <input
              {...register("postBody")}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit: </p>
              <input
                {...register("subreddit", { required: true })}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="i.e. reactjs"
              />
            </div>
          )}
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL: </p>
              <input
                {...register("postImage")}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="Optional"
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <>
              <div className="space-y-2 p-2 text-red-500">
                {errors.postTitle?.type === "required" && (
                  <p>A Post Title is Required</p>
                )}
                {errors.subreddit?.type === "required" && (
                  <p>A Subreddit is Required</p>
                )}
              </div>
            </>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default Postbox;
