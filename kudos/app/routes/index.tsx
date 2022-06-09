import { requireUserId } from "~/utils/auth.server";

import type { LoaderFunction } from "@remix-run/node";

export function ErrorBoundary({ error }: any) {
	console.log(error);
	return (
		<div>
			<h1>Sorry An Error Occured</h1>
			<pre>{error}</pre>
		</div>
	);
}

const loader: LoaderFunction = async ({ request }) => {
	await requireUserId(request);
	return null;
};

export default function Index() {
	// const todos = useLoaderData();
	return (
		<div className="h-screen bg-slate-700 flex justify-center items-center">
			<h2 className="text-blue-600 font-extrabold text-5xl">
				TailwindCSS Is Working!
			</h2>
		</div>
	);
}

export { loader };
