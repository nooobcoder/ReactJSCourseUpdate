import { json } from "@remix-run/node";
import { Link, useLoaderData, useCatch } from "@remix-run/react";
import { db } from "~/utils/db.server";

import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";

type LoaderData = {
	joke: Joke;
};

const loader: LoaderFunction = async () => {
	const count = await db.joke.count();
	const randomRowNumber = Math.floor(Math.random() * count);
	const [joke] = await db.joke.findMany({
		take: 1,
		skip: randomRowNumber,
	});
	if (!joke) {
		throw new Response("No random joke found", {
			status: 404,
		});
	}

	const data: LoaderData = { joke };

	return json(data);
};

const ErrorBoundary = () => (
	<div className="error-container">I did a whoopsies.</div>
);

const CatchBoundary = () => {
	const caught = useCatch();

	if (caught.status === 404) {
		return (
			<div className="error-container">
				There are no jokes to display.
			</div>
		);
	}
	throw new Error(`Unexpected caught response with status: ${caught.status}`);
};

export default function JokesIndexRoute() {
	const { joke } = useLoaderData<LoaderData>();

	return (
		<div>
			<p>Here's a random joke:</p>
			<em>{joke.content}</em>
			<br />
			<Link to={joke.id}>"{joke.name}" Permalink</Link>
		</div>
	);
}

export { loader, ErrorBoundary, CatchBoundary };
