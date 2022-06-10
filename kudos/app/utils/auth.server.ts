import bcrypt from "bcryptjs";
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";

import { createUser } from "~/utils/user.server";
import { prisma } from "./prisma.server";

import type { RegisterForm, LoginForm } from "./types.server";

const sessionSecret =
	process.env.SESSION_SECRET ||
	bcrypt.hashSync(Math.random().toString(), bcrypt.genSaltSync(10));

if (!sessionSecret) {
	throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
	cookie: {
		name: `kudos-session`,
		secure: process.env.NODE_ENV === "production",
		secrets: [sessionSecret],
		sameSite: `lax`,
		path: `/`,
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

const getUserSession = (request: Request) => {
	return storage.getSession(request.headers.get("Cookie"));
};

const createUserSession = async (userId: string, redirectTo: string = `/`) => {
	const session = await storage.getSession();
	session.set(`userId`, userId);
	return redirect(redirectTo, {
		headers: { "Set-Cookie": await storage.commitSession(session) },
	});
};

const register = async (user: RegisterForm) => {
	const exists = await prisma.user.count({ where: { email: user.email } });
	if (exists) {
		return json(
			{ error: `User already exists with that email` },
			{ status: 400, statusText: `User already exists` }
		);
	}

	const newUser = await createUser(user);
	if (!newUser) {
		return json(
			{
				error: `Something went wrong trying to create a new user.`,
				fields: { email: user.email, password: user.password },
			},
			{ status: 400 }
		);
	}

	return createUserSession(newUser.id, `/`);
};

const login = async ({ email, password }: LoginForm) => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !(await bcrypt.compare(password, user.password)))
		return json({ error: `Incorrect login` }, { status: 400 });

	return createUserSession(user.id, `/`);
};

const logout = async (request: Request) => {
	const session = await getUserSession(request);
	return redirect("/login", {
		headers: {
			"Set-Cookie": await storage.destroySession(session),
		},
	});
};

const getUserId = async (request: Request) => {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "string") return null;
	return userId;
};

const requireUserId = async (
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) => {
	const session = await getUserSession(request);
	const userId = session.get("userId");
	if (!userId || typeof userId !== "string") {
		const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
		throw redirect(`/login?${searchParams}`);
	}
	return userId;
};

const getUser = async (request: Request) => {
	const userId = await getUserId(request);
	if (typeof userId !== "string") {
		return null;
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, email: true, profile: true },
		});
		return user;
	} catch {
		throw logout(request);
	}
};

export { createUserSession, register, login, logout, requireUserId, getUser };
