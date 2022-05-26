import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesUrl }];

const meta: MetaFunction = () => ({
	title: "Remix: So great, it's funny!",
	description: "Remix jokes app. Learn Remix and laugh at the same time!",
});

export default function IndexRoute() {
	return (
		<div className="container">
			<div className="content">
				<h1>
					Remix
					<span>
						Jokes! by <a href="https://remix.run">remix.run 💿</a>
					</span>
				</h1>
				<nav>
					<ul>
						<li>
							<Link to="jokes">Read Jokes</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export { links, meta };
