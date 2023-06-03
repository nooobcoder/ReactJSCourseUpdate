"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
	const { data: session } = useSession();

	return (
		<div className="text-center">
			<button
				className="h-10 p-2 transition-all duration-100 bg-orange-300 rounded-lg dark:text-white dark:bg-orange-600 hover:bg-gray-600 dark:hover:bg-gray-300 bottom-32 dark:hover:text-black hover:text-white"
				onClick={() => {
					return session ? signOut() : signIn("google");
				}}
			>
				{!session ? `Login with google` : `Logout`}
			</button>
		</div>
	);
};

export default AuthButton;
