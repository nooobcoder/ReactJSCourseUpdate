import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import stylesUrl from "~/styles/app.css";
import Layout from "./layouts";

import type {
	ErrorBoundaryComponent,
	LinksFunction,
	MetaFunction,
} from "@remix-run/node";

interface DocumentProps {
	children: React.ReactNode;
}

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Medusa Remix StoreFront",
	viewport: "width=device-width,initial-scale=1",
});

const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesUrl }];
const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
	<Document>
		<Layout>
			<div className="text-red-500">
				<h1>Error</h1>
				<p>{error.message}</p>
			</div>
		</Layout>
	</Document>
);

const Document: React.FC<DocumentProps> = ({ children }: DocumentProps) => (
	<html lang="en">
		<head>
			<Meta />
			<Links />
		</head>
		<body>{children}</body>
	</html>
);

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</Layout>
		</Document>
	);
}
export { links, ErrorBoundary };
