import { useLoaderData, Link } from "remix";
import { getPosts } from "../../post";
import type { Post } from "../../post";

export let loader = () => getPosts();

export default function Posts() {
	let posts = useLoaderData<Array<Post>>();
	console.log(posts);

	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map((p: Post) => (
					<li key={p.slug}>
						<Link to={p.slug}>{p.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
