import { getPosts, Post } from "../post";
import { Outlet, useLoaderData } from "remix";
import { Link } from "remix";
import adminStyles from "../styles/admin.css";

export let links = () => [{ rel: "stylesheet", href: adminStyles }];

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  let posts = useLoaderData<Array<Post>>();
  return (<div className="admin">
    <nav>
      <h1>Admin</h1>
      <ul>
        {posts.map(({ slug, title }) => <li key={slug}><Link to={slug}>{title}</Link></li>)}
      </ul>
    </nav>
    <main><Outlet /></main>
  </div>);
}