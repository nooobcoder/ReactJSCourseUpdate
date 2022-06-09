import { json } from "@remix-run/node";

import { prisma } from "./prisma.server";

import type { RegisterForm } from "./types.server";

const register = async (user: RegisterForm) => {
	const exists = await prisma.user.count({ where: { email: user.email } });
	if (exists) {
		return json(
			{ error: `User already exists with that email` },
			{ status: 400, statusText: `User already exists` }
		);
	}
};

export { register };
