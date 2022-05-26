import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";

type LoaderData = {
	joke: Joke;
};

const loader: LoaderFunction = async ({ params }) => {
	const joke = await db.joke.findUnique({
		where: { id: params.jokeId },
	});

	if (!joke) throw new Error("Joke not found");

	const data: LoaderData = { joke };
	return json(data, { status: 200 });
};

export default function JokeRoute() {
	const { joke } = useLoaderData<LoaderData>();

	return (
		<div>
			<h2>{joke.name}</h2>
			<p>{joke.content}</p>
			<Link to=".">{joke.name} Permalink</Link>
		</div>
	);
}

export { loader };
