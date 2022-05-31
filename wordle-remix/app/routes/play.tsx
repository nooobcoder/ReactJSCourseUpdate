import { Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Grid } from "~/components/Grid";
import { Mark } from "~/components/Mark";
import { Tile } from "~/components/Tile";
import { getSession, commitSession } from "~/utils/sessions";
import { getRandomWord } from "~/utils/words";

import type { LetterGuess } from "~/types.d";
import type { LoaderFunction } from "@remix-run/node";

const loader: LoaderFunction = async ({ request: { headers } }) => {
	const session = await getSession(headers.get("Cookie"));

	if (!session.has("word")) session.set("word", getRandomWord());
	if (!session.has("guesses")) session.set("guesses", []);
	if (!session.has("status")) session.set("status", "play");

	return json(
		{ guesses: session.get("guesses"), status: session.get("status") },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
};

export default function Play() {
	const gridItems: LetterGuess[] = [
		...new Array(30)
			.fill("\xa0") // &nbsp;
			.map((letter) => ({ letter })),
	];

	return (
		<main className="my-8 mx-4">
			<div className="flex justify-center">
				<div>
					<div className="mb-8">
						<span>
							Press <Mark>Enter</Mark> to submit...
						</span>
					</div>
					<Grid>
						{gridItems.map(({ letter, status }, index) => (
							<Tile key={index} status={status}>
								{letter.toUpperCase()}
							</Tile>
						))}
					</Grid>
				</div>
			</div>
			<Outlet />
		</main>
	);
}

export { loader };
