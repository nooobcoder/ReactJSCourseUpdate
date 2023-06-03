import { Profile } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "./prisma.server";

import type { RegisterForm } from "./types.server";

const createUser = async (user: RegisterForm) => {
	const passwordHash = await bcrypt.hash(user.password, 10);
	const newUser = await prisma.user.create({
		data: {
			email: user.email,
			password: passwordHash,
			profile: {
				firstName: user.firstName,
				lastName: user.lastName,
			},
		},
	});
	return { id: newUser.id, email: user.email };
};

const getOtherUsers = async (userId: string) => {
	return prisma.user.findMany({
		where: {
			id: { not: userId },
		},
		orderBy: {
			profile: {
				firstName: "asc",
			},
		},
	});
};

const getUserById = async (userId: string) =>
	await prisma.user.findUnique({ where: { id: userId } });

const updateUser = async (userId: string, profile: Partial<Profile>) => {
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			profile: {
				update: profile,
			},
		},
	});
};

const deleteUser = async (id: string) =>
	await prisma.user.delete({ where: { id } });

export { createUser, getOtherUsers, getUserById, updateUser, deleteUser };
