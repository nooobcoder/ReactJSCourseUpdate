import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
type Data = { name: String };

const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DAYASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	useCdn: process.env.NODE_EN === "production",
	token: process.env.SANITY_API_TOKEN,
};
const client = sanityClient(config);

export default async function createComment(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("API HIT");
	const { _id, name, email, comment } = JSON.parse(req.body);
	console.log(req.body);
	try {
		await client.create({
			_type: "comment",
			post: { _type: "reference", _ref: _id },
			name,
			email,
			comment,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Could not submit comment", error });
	}

	res.status(200).json({ name: "Comment Submitted" });
}
