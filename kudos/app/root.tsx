import {
	Outlet,
	LiveReload,
	Link,
	Links,
	Meta,
	Scripts,
} from "@remix-run/react";
import React from "react";
import styles from "./styles/output.css";

export function links() {
	return [{ rel: "stylesheet", href: styles }];
}

export function meta() {
	const description = "Mongodb, heroku, tailwindcss stack for Remix";
	const keywords = "remix, react, mongodb, tailwindcss, heroku";

	return {
		description,
		keywords,
	};
}

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
}

type iDocType = {
	children: React.ReactNode;
	title?: string;
};

export function ErrorBoundry({ error }: any) {
	console.log(error);
	return (
		<Document>
			<Layout>
				<h1>Sorry An Error Occured</h1>
				<pre>{error}</pre>
			</Layout>
		</Document>
	);
}

function Document({ children, title }: iDocType) {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
				<title>{title ? title : "Kudos Remix"}</title>
			</head>
			<body>
				{children}
				<LiveReload />
				<Scripts />
			</body>
		</html>
	);
}

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* <div className="border-b border-b-zinc-300 px-2">
				<div className="container mx-auto">
					<nav className="flex justify-between items-center p-2">
						<Link to="/">Logo</Link>

						<ul className="flex justify-end min-w-[10rem] gap-10">
							<li>
								<Link to="/about">Abouts</Link>
							</li>
							<li>
								<Link to="/history">History</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div> */}

			<main>{children}</main>
		</>
	);
}
