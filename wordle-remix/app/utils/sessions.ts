import { createCookieSessionStorage } from "@remix-run/node";

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

export { getSession, commitSession, destroySession };
