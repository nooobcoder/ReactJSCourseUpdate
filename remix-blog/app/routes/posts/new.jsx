import { Link, redirect } from "remix";
import db from "~/utils/db.server";

// https://remix.run/docs/en/v1/api/conventions#action
export const action = async ({ request }) => {
	const form = await request.formData();
	const title = form.get("title");
	const body = form.get("body");

	const fields = { title, body };

	// TODO: Submit data to database
	const post = await db.post.create({ data: fields });

	return redirect(`/posts/${post.id}`);
};

const NewPost = () => {
	return (
		<>
			<div className="page-header">
				<h1>New Post</h1>
				<Link to="/posts" className="btn btn-reverse">
					Back
				</Link>
			</div>

			<div className="page-content">
				<form method="post">
					<div className="form-control">
						<label htmlFor="title">
							<input type="text" name="title" id="title" />
						</label>
					</div>
					<div className="form-control">
						<label htmlFor="body">Post Body</label>
						<textarea name="body" id="body" />
					</div>
					<button type="submit" className="btn btn-block">
						Add Post
					</button>
				</form>
			</div>
		</>
	);
};

export default NewPost;
