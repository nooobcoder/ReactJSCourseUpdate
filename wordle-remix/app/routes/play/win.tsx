import { useNavigate, useLoaderData } from "@remix-run/react";
import { useCallback } from "react";
import { json } from "@remix-run/node";

import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Mark } from "~/components/Mark";
import { commitSession, getSession } from "~/utils/sessions";

import type { LoaderFunction } from "@remix-run/node";

const loader: LoaderFunction = async ({ request: { headers } }) => {
	const session = await getSession(headers.get("Cookie"));

	return json(
		{ word: session.get("word") },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
};

function Win() {
	const { word } = useLoaderData<{ word: string }>();
	const navigate = useNavigate();
	const onClose = useCallback(() => navigate("/play"), []);

	return (
		<Dialog onClose={onClose}>
			<div className="text-center">
				<div className="text-8xl mb-4">🎉</div>
				<h2 className="text-3xl mb-4 font-semibold">
					Congratulations!
				</h2>
				<p className="max-w-lg mb-6">
					That was very impressive - you guessed <Mark>{word}</Mark>{" "}
					right. Typically you wouldn't be able to play again. Here
					you can actually do that!
				</p>
				<form method="post">
					<Button type="submit">Play again</Button>
				</form>
			</div>
		</Dialog>
	);
}

export default Win;
export { loader };
