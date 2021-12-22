import { Fragment } from "react/cjs/react.production.min";
import { Outlet, LiveReload, Link, Links, Meta } from "remix";
import globalStylesURL from "~/styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStylesURL }];
export const meta = () => ({
	description: "A cool blog built with Remix!",
	keywords: "remix, react, javascript",
});

export default () => (
	<Document>
		<Layout>
			<Outlet />
		</Layout>
	</Document>
);

const Document = ({ children, title }) => {
	return (
		<html>
			<head>
				<Links />
				<Meta />
				<title>{title ? title : "My Remix Blog"}</title>
			</head>
			<body>
				{children}
				{process.env.NODE_ENV === "development" ? <LiveReload /> : null}
			</body>
		</html>
	);
};

const Layout = ({ children }) => (
	<Fragment>
		<nav className="navbar">
			<Link to="/" className="remix">
				Remix
			</Link>

			<ul className="nav">
				<li>
					<Link to="/posts">Posts</Link>
				</li>
			</ul>
		</nav>

		<div>{children}</div>
	</Fragment>
);

export const ErrorBoundary = ({ error }) => {
	console.error(error);
	return (
		<Document>
			<Layout>
				<h1> Oh Snap! An error occured.</h1>
				<p>{error.message}</p>
			</Layout>
		</Document>
	);
};
