import { json } from "@remix-run/node";
import { useLoaderData, Link, useParams, useCatch } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";

import type { Joke } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

type LoaderData = { joke: Joke; isOwner: boolean };

const loader: LoaderFunction = async ({ request, params }) => {
	const userId = await getUserId(request);
	const joke = await db.joke.findUnique({
		where: { id: params.jokeId },
	});

	if (!joke)
		throw new Response("What a joke! Not found.", {
			status: 404,
		});

	const data: LoaderData = { joke, isOwner: userId === joke.jokesterId };
	return json(data, { status: 200 });
};

const meta: MetaFunction = ({ data }: { data: LoaderData | undefined }) => {
	if (!data) {
		return {
			title: "No joke",
			description: "No joke found",
		};
	}
	return {
		title: `"${data.joke.name}" joke`,
		description: `Enjoy the "${data.joke.name}" joke and much more`,
	};
};

const ErrorBoundary = ({ error }: { error: Error }) => {
	const { jokeId } = useParams();
	return (
		<div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
	);
};

const CatchBoundary = () => {
	const caught = useCatch();
	const params = useParams();
	switch (caught.status) {
		case 400: {
			return (
				<div className="error-container">
					What you're trying to do is not allowed.
				</div>
			);
		}
		case 404: {
			return (
				<div className="error-container">
					Huh? What the heck is {params.jokeId}?
				</div>
			);
		}
		case 401: {
			return (
				<div className="error-container">
					Sorry, but {params.jokeId} is not your joke.
				</div>
			);
		}
		default: {
			throw new Error(`Unhandled error: ${caught.status}`);
		}
	}
};

export default function JokeRoute() {
	const { joke, isOwner } = useLoaderData<LoaderData>();

	return (
		<div>
			<h2>{joke.name}</h2>
			<p>{joke.content}</p>
			<Link to=".">{joke.name} Permalink</Link>
			{isOwner ? (
				<form method="post">
					<input type="hidden" name="_method" value="delete" />
					<button type="submit" className="button">
						Delete
					</button>
				</form>
			) : null}
		</div>
	);
}

export { loader, meta, ErrorBoundary, CatchBoundary };
