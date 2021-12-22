// Use the filename as the path alias

import { useParams } from "remix";

const Post = () => {
	const params = useParams();

	return (
		<div>
			<h1>
				Post
				{params.postID}
			</h1>
		</div>
	);
};

export default Post;
