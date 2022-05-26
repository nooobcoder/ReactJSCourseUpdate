import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";

const loader: LoaderFunction = async ({ params }) => {
  const post = await getPost(params.slug!);
  return json({ post });
};

const PostSlug = () => {
  const { post } = useLoaderData();

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
