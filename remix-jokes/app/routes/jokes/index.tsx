import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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

	const data: LoaderData = { joke };

	return json(data);
};

export default function JokesIndexRoute() {
	const { joke } = useLoaderData<LoaderData>();

	return (
		<div>
			<p>Here's a random joke:</p>
			<p>{joke.content}</p>
			<Link to={joke.id}>"{joke.name}" Permalink</Link>
		</div>
	);
}

export { loader };
