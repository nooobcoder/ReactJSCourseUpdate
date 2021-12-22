import { useLoaderData, Link } from "remix";

export const loader = () => {
	// Do fetch tasks here and send it to client
	const data = {
		posts: [
			{ id: 1, title: "Post 1", body: "This is a test post." },
			{ id: 2, title: "Post 2", body: "This is a test post." },
			{ id: 3, title: "Post 3", body: "This is a test post." },
		],
	};
	return data;
};

const PostItems = () => {
	const backendData = useLoaderData();
	const { posts } = backendData;
	return (
		<div>
			<div className="page-header">
				<h1>Posts</h1>
				<Link to="/posts/new" className="btn">
					New Post
				</Link>
			</div>

			<ul className="posts-list">
				{posts.map(({ id, title }) => (
					<li key={id}>
						<Link to={id}>
							<h3>{title}</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostItems;
