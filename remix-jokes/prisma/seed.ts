import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

const getJokes = () => [
	{
		name: "Road worker",
		content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
	},
	{
		name: "Frisbee",
		content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
	},
	{
		name: "Trees",
		content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
	},
	{
		name: "Skeletons",
		content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
	},
	{
		name: "Hippos",
		content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
	},
	{
		name: "Dinner",
		content: `What did one plate say to the other plate? Dinner is on me!`,
	},
	{
		name: "Elevator",
		content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
	},
	{
		name: "Coffee",
		content: `I'm not a coffee drinker, but I can make you a cup of coffee.`,
	},
	{
		name: "Sleep",
		content: `Slept like a log last night … woke up in the fireplace.`,
	},
];

const seed = async () => {
	// Hash a password
	const passwordHash = await bcrypt.hash("ankurpaul", 10);
	const kody = await db.user.create({
		data: {
			username: "ankurpaul",
			passwordHash,
		},
	});

	await Promise.all(
		getJokes().map((joke) =>
			db.joke.create({ data: { jokesterId: kody.id, ...joke } })
		)
	);
};

seed();
