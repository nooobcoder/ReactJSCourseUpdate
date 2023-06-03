import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, useCatch } from "@remix-run/react";

import globalLargeStylesUrl from "./styles/global-large.css";
import globalMediumStylesUrl from "./styles/global-medium.css";
import globalStylesUrl from "./styles/global.css";

const meta: MetaFunction = () => {
	const description = `Learn Remix and laugh at the same time!`;
	return {
		charset: "utf-8",
		description,
		keywords: "Remix,jokes",
		"twitter:image": "https://remix-jokes.lol/social.png",
		"twitter:card": "summary_large_image",
		"twitter:creator": "@remix_run",
		"twitter:site": "@remix_run",
		"twitter:title": "Remix Jokes",
		"twitter:description": description,
	};
};

const links: LinksFunction = () => [
	{
		rel: "stylesheet",
		href: globalStylesUrl,
	},
	{
		rel: "stylesheet",
		href: globalMediumStylesUrl,
		media: "print, (min-width: 640px)",
	},
	{
		rel: "stylesheet",
		href: globalLargeStylesUrl,
		media: "screen and (min-width: 1024px)",
	},
];

function Document({
	children,
	title = `Remix: So great, it's funny!`,
}: {
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<html lang="en">
			<head>
				<Meta />
				<title>{title}</title>
				<Links />
			</head>
			<body>
				{children}
				<LiveReload />
			</body>
		</html>
	);
}

const ErrorBoundary = ({ error }: { error: Error }) => {
	console.error(error);

	return (
		<Document title="Uh-oh!">
			<div className="error-container">
				<h1>App Error</h1>
				<pre>{error.message}</pre>
			</div>
		</Document>
	);
};

const CatchBoundary = () => {
	const caught = useCatch();

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<div className="error-container">
				<h1>
					{caught.status} {caught.statusText}
				</h1>
			</div>
		</Document>
	);
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Remix: So great, it's funny!</title>
				<Links />
			</head>
			<body>
				<Document>
					<Outlet />
				</Document>
			</body>
		</html>
	);
}

export { links, meta, ErrorBoundary, CatchBoundary };
