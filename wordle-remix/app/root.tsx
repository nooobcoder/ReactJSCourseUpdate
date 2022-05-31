import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	ScrollRestoration,
	Scripts,
	Link,
} from "@remix-run/react";

import { Logo } from "~/components/Logo";

import type { LinksFunction, MetaFunction } from "@remix-run/node";

import stylesUrl from "./styles/app.css";

const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesUrl }];

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<header className="flex justify-center border-b-2 border-gray-100 p-4">
					<Link to="/">
						<Logo size="md" />
					</Link>
				</header>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export { meta, links };
