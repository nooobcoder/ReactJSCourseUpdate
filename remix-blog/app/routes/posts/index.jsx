import { useLoaderData, Link } from "remix";
import db from "~/utils/db.server";

export const loader = async () => {
	// Do fetch tasks here and send it to client
	const data = await db.post.findMany({
		take: 20,
		select: { id: true, title: true, createdAt: true },
		orderBy: { createdAt: "desc" },
	});

	console.log(data);
	return data;
};

const PostItems = () => {
	const posts = useLoaderData();
	return (
		<div>
			<div className="page-header">
				<h1>Posts</h1>
				<Link to="/posts/new" className="btn">
					New Post
				</Link>
			</div>

			<ul className="posts-list">
				{posts.map(({ id, title, createdAt }) => (
					<li key={id}>
						<Link to={id}>
							<h3>{title}</h3>
							{new Date(createdAt).toLocaleString()}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostItems;
