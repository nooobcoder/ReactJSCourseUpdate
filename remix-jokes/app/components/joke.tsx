import type { Joke } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

type PropType = {
	joke: Pick<Joke, "content" | "name">;
	isOwner: boolean;
	canDelete?: boolean;
};

const JokeDisplay = ({ joke, isOwner, canDelete = true }: PropType) => (
	<div>
		<p>Here's your hilarious joke:</p>
		<p>{joke.content}</p>
		<Link to=".">{joke.name} Permalink</Link>
		{isOwner ? (
			<Form method="post">
				<input type="hidden" name="_method" value="delete" />
				<button type="submit" className="button" disabled={!canDelete}>
					Delete
				</button>
			</Form>
		) : null}
	</div>
);

export default JokeDisplay;
