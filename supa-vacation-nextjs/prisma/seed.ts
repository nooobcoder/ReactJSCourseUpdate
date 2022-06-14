import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
	const homes = await prisma.home.createMany({
		data: [
			{
				id: "001",
				image: "/homes/space.jpeg",
				title: "Peaceful retreat in Space with stunning view of Earth",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				guests: 2,
				beds: 1,
				baths: 1,
				price: 2500,
			},
			{
				id: "002",
				image: "/homes/amsterdam.jpeg",
				title: "Luxury houseboat in Amsterdam center",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				guests: 4,
				beds: 3,
				baths: 2,
				price: 1500,
			},
			{
				id: "003",
				image: "/homes/providence.jpeg",
				title: "Clean and modern apartment in downtown Providence, RI",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				guests: 2,
				beds: 1,
				baths: 1,
				price: 170,
			},
			{
				id: "004",
				image: "/homes/shanghai.jpeg",
				title: "Entire rental unit on the Bund - Shanghai",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				guests: 6,
				beds: 3,
				baths: 3,
				price: 765,
			},
		],
	});

	console.log(homes);
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
