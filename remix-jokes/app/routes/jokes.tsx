import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/session.server";

import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import type { Joke } from "@prisma/client";

import stylesUrl from "~/styles/jokes.css";
import { db } from "~/utils/db.server";

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
	jokeListItems: Array<{ id: string; name: string } | Joke>;
};

const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

const loader: LoaderFunction = async ({ request }) => {
	const user = await getUser(request);
	const data: LoaderData = {
		jokeListItems: (
			await db.joke.findMany({
				// orderBy: { createdAt: "desc" },
				take: 5,
				select: { id: true, name: true },
			})
		).sort(
			() => 0.5 - Math.random() // Shuffle the jokes
		),
		user,
	};
	return json(data);
};

function JokesRoute() {
	const { jokeListItems, user } = useLoaderData<LoaderData>();

	return (
		<div className="jokes-layout">
			<header className="jokes-header">
				<div className="container">
					<h1 className="home-link">
						<Link
							to="/"
							title="Remix Jokes"
							aria-label="Remix Jokes"
						>
							<span className="logo">🤪</span>
							<span className="logo-medium">J🤪KES</span>
						</Link>
					</h1>
					{user ? (
						<div className="user-info">
							<span>{`Hi ${user.username}`}</span>
							<form action="/logout" method="post">
								<button type="submit" className="button">
									Logout
								</button>
							</form>
						</div>
					) : (
						<Link to="/login">Login</Link>
					)}
				</div>
			</header>
			<main className="jokes-main">
				<div className="container">
					<div className="jokes-list">
						<Link to=".">Get a random joke</Link>
						<p>Here are a few more jokes to check out:</p>
						<ul>
							{jokeListItems.map((joke) => (
								<li key={`${joke.id}-${joke.name}`}>
									<Link to={joke.id}>{joke.name}</Link>
								</li>
							))}
						</ul>
						<Link to="new" className="button">
							Add your own
						</Link>
					</div>
					<div className="jokes-outlet">
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}

export default JokesRoute;
export { links, loader };
