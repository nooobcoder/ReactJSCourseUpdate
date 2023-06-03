// Banner responsible for displaying logged in user's name and avatar
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserWelcomeBanner = () => {
	const session = useSession();
	const userData = session.data?.user;

	return (
		session.data && (
			<div className="flex justify-between">
				<h1 className="text-xl font-bold text-center ">
					Welcome, {userData?.name}
				</h1>
				<div className="flex items-center gap-1 pr-2 space-x-2 bg-gray-600 rounded-full dark:bg-black">
					<Image
						// rounded avatar
						className="rounded-full"
						src={String(userData?.image)}
						width={40}
						height={40}
						alt={String(session.data)}
					/>
					<div className="">{userData?.name}</div>
				</div>
			</div>
		)
	);
};

export default UserWelcomeBanner;
