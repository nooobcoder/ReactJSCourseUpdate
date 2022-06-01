import { createCookieSessionStorage, redirect } from "@remix-run/node";

import type { GameStatus } from "~/types";

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		cookie: {
			name: "__session",
			httpOnly: true,
			// sameSite -> `lax` or `strict` for CSRF protection
			sameSite: "lax",
			path: "/play",
			secrets: ["supa-s3cr3t1"],
			secure: true,
		},
	});

const requireSessionStatus = async (
	request: Request,
	requiredStatus: GameStatus
) => {
	const session = await getSession(request.headers.get("Cookie"));
	const status = session.get("status");

	if (status !== requiredStatus) {
		throw new redirect("/play");
	}

	return session;
};

export { getSession, commitSession, destroySession, requireSessionStatus };
