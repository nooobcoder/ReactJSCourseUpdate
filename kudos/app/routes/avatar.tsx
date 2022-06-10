import { json } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { uploadAvatar } from "~/utils/s3.server";
import { requireUserId } from "~/utils/auth.server";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
	const userId = await requireUserId(request);
	const imageUrl = await uploadAvatar(request);

	await prisma.user.update({
		data: {
			profile: {
				update: {
					profilePicture: imageUrl,
				},
			},
		},
		where: {
			id: userId,
		},
	});

	return json({ imageUrl });
};
