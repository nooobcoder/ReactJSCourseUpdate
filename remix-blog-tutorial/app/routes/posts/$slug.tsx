import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";

type LoaderData = { post: Post };

const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

const PostSlug = () => {
  const { post } = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto mt-3 max-w-4xl">
      <Link to="/posts" className="rounded-md bg-blue-200 p-3">
        Back
      </Link>
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
    </main>
  );
};

export default PostSlug;
export { loader };
