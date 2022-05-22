import { useMutation, useQuery } from "@apollo/client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";
import { ADD_VOTE } from "../graphql/mutations";
import { GET_VOTES_BY_POST_ID } from "../graphql/queries";

import Avatar from "./Avatar";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean | undefined>(() => undefined);

  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: { post_id: post?.id },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast.error("You must be logged in to vote");
      return;
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upVote: isUpvote,
      },
    });
  };

  if (!post) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    );
  }

  /* useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    // Latest vote (as we sorted by newly created first in SQL query)
    // TODO: You could improve this by moving it to the original query
    const vote = votes?.find((v) => v.username === session?.user?.name)?.upvote;
    setVote(vote);
  }, [data]); */

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && "text-red-400"
            }`}
          />
          <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && "text-blue-400"
            }`}
          />
        </div>
        <div className="p-3 pb-1 ">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              ^_^ Posted by u/
              {post.username}
              <div></div>
              <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className="py-4 ">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {/* Image */}
          <img className="w-full" src={post.image} alt="post" />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons flex">
              <ChatAltIcon className="h-6 w-6" />
              <p>{post.comments.length} Comments</p>
            </div>
            <div className="postButtons flex">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Award</p>
            </div>
            <div className="postButtons flex">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Share</p>
            </div>
            <div className="postButtons flex">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Save</p>
            </div>
            <div className="postButtons flex">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
