import { PrismaClient } from "@prisma/client";

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const prisma =
	global.prisma ||
	new PrismaClient({
		log: ["query"],
	});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const createHome = async (
	data = {
		title: "Clean and modern apartment in downtown Providence, RI",
		description: "Entire rental unit + free wifi",
		price: 185,
		guests: 4,
		beds: 2,
		baths: 1,
	}
) =>
	await prisma.home.create({
		data,
	});

const updateHome = async () =>
	await prisma.home.update({
		data: {
			price: 200,
		},
		where: {
			id: `cjld2cjxh0000qzrmn831i7rn`,
		},
	});

const deleteHome = async () =>
	await prisma.home.delete({
		where: {
			id: `cjld2cjxh0000qzrmn831i7rn`,
		},
	});

const getAllHomes = async (args = {}) => await prisma.home.findMany(args);

const getHomeById = async (id=`1`) => await prisma.home.findUnique({where:{id}});

export { createHome, updateHome, deleteHome, getAllHomes,getHomeById, prisma };
