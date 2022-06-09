import { useLoaderData, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";

import { UserPanel } from "~/components/UserPanel";
import { Layout } from "~/components/Layout";
import SearchBar from "~/components/SearchBar";
import { Kudo } from "~/components/Kudo";
import { RecentBar } from "~/components/RecentBar";
import { requireUserId } from "~/utils/auth.server";
import { getOtherUsers } from "~/utils/user.server";
import { getFilteredKudos, getRecentKudos } from "~/utils/kudos.sever";

import type { LoaderFunction } from "@remix-run/node";
import type { Kudo as IKudo, Profile, Prisma } from "@prisma/client";

interface KudoWithProfile extends IKudo {
	author: {
		profile: Profile;
	};
}

const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserId(request);
	const users = await getOtherUsers(userId);

	const url = new URL(request.url);
	const sort = url.searchParams.get(`sort`);
	const filter = url.searchParams.get(`filter`);

	let sortOptions: Prisma.KudoOrderByWithRelationInput = {};
	if (sort) {
		if (sort === "date") {
			sortOptions = { createdAt: "desc" };
		}
		if (sort === "sender") {
			sortOptions = { author: { profile: { firstName: "asc" } } };
		}
		if (sort === "emoji") {
			sortOptions = { style: { emoji: "asc" } };
		}
	}

	let textFilter: Prisma.KudoWhereInput = {};
	if (filter) {
		textFilter = {
			OR: [
				{ message: { mode: "insensitive", contains: filter } },
				{
					author: {
						OR: [
							{
								profile: {
									is: { firstName: { mode: "insensitive", contains: filter } },
								},
							},
							{
								profile: {
									is: { lastName: { mode: "insensitive", contains: filter } },
								},
							},
						],
					},
				},
			],
		};
	}
	const kudos = await getFilteredKudos(userId, sortOptions, textFilter);
	const recentKudos = await getRecentKudos();

	return json({ users, kudos, recentKudos }, { status: 200 });
};

export default function Home() {
	const { users, kudos, recentKudos } = useLoaderData();

	return (
		<Layout>
			<Outlet />
			<div className="h-full flex">
				<UserPanel users={users} />
				<div className="flex-1 flex flex-col">
					<SearchBar />
					<div className="flex-1 flex">
						<div className="w-full p-10 flex flex-col gap-y-4">
							{kudos.map((kudo: KudoWithProfile) => (
								<Kudo key={kudo.id} kudo={kudo} profile={kudo.author.profile} />
							))}
						</div>
						<RecentBar kudos={recentKudos} />
					</div>
				</div>
			</div>
		</Layout>
	);
}

export { loader };
