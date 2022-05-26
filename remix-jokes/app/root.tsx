import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet } from "@remix-run/react";

import globalStylesUrl from "./styles/global.css";
import globalMediumStylesUrl from "./styles/global-medium.css";
import globalLargeStylesUrl from "./styles/global-large.css";

const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

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

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Remix: So great, it's funny!</title>
				<Links />
			</head>
			<body>
				<Outlet />
				<LiveReload />
			</body>
		</html>
	);
}

export { links, meta };
