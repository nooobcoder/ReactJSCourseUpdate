import { useNavigate } from "@remix-run/react";
import { useCallback } from "react";
import { json } from "@remix-run/node";

import { Dialog } from "~/components/Dialog";
import { Mark } from "~/components/Mark";
import { Button } from "~/components/Button";
import { getSession, destroySession, commitSession } from "~/utils/sessions";

import type { LoaderFunction } from "@remix-run/node";

const loader: LoaderFunction = async ({ request: { headers } }) => {
	const session = await getSession(headers.get("Cookie"));

	return json(
		{
			word: session.get("word"),
		},
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
};

function Loss() {
	const word = "index";
	const navigate = useNavigate();
	const onClose = useCallback(() => navigate("/play"), []);

	return (
		<Dialog onClose={onClose}>
			<div className="text-center">
				<div className="text-8xl mb-4">🥺</div>
				<h2 className="text-3xl mb-4 font-semibold">Ooops...</h2>
				<p className="max-w-lg mb-6">
					That was hard - it was <Mark>{word}</Mark> you were looking
					for. Typically you wouldn't be able to play again. Here you
					can actually try again!
				</p>
				<Button
					data-bs-toggle="tooltip"
					data-bs-placement="top"
					title={`/play`}
				>
					Play again
				</Button>
			</div>
		</Dialog>
	);
}

export default Loss;
export { loader };
