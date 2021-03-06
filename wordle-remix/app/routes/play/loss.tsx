import { useCallback } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Mark } from "~/components/Mark";
import {
	commitSession,
	destroySession,
	getSession,
	requireSessionStatus,
} from "~/utils/sessions";

import type { LoaderFunction, ActionFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
	const session = await requireSessionStatus(request, "loss");

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

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));

	return redirect("/play", {
		headers: { "Set-Cookie": await destroySession(session) },
	});
};

export default function Loss() {
	const { word } = useLoaderData<{ word: string }>();
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
				<form method="post">
					<Button type="submit">Play again</Button>
				</form>
			</div>
		</Dialog>
	);
}
