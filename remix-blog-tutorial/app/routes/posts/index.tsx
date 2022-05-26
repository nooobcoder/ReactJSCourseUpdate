import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

// Declare a interface for posts
type Post = {
  title: string;
  slug: string;
};

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
  // posts: Array<Post>;
};

/*
 * Loader is an async function serving as a REST endpoint fetching data to the View `Posts`
 * Remix was built keeping MVCs in mind.
 * Loaders are the backend "API" for their component and it's already wired up for you through useLoaderData.
 */
export const loader = async () => {
  // 💿 Update the posts route to use our new posts module
  return json<LoaderData>({ posts: await getPosts() });
  /* return json<LoaderData>({
    posts: [
      {
        slug: "my-first-post",
        title: "My First Post",
      },
      {
        slug: "90s-mixtape",
        title: "A Mixtape I Made Just For You",
      },
    ],
  }); */
};

const Posts = () => {
  const { posts } = useLoaderData<LoaderData>(); // Use the useLoaderData hook to get the posts from the loader
  console.log(posts);

  return (
    <main>
      <h1>Posts</h1>
      {/* Render object as html */}
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Posts;
