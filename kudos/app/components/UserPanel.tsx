import {
	Link,
	// useNavigate,
} from "@remix-run/react";

import { UserCircle } from "./UserCircle";

import type { User } from "@prisma/client";

export function UserPanel({ users }: { users: User[] }) {
	// const navigate = useNavigate();

	return (
		<div className="w-1/5 bg-gray-200 flex flex-col">
			<div className="text-center bg-gray-300 h-20 flex items-center justify-center">
				<Link
					to="/"
					className="text-xl text-blue-600 font-semibold cursor-pointer"
				>
					My Team
				</Link>
			</div>
			<div className="flex-1 overflow-y-scroll py-4 px-2 flex flex-col gap-y-10">
				{users.map((user) => (
					<Link to={`./kudo/${user.id}`} key={user.id}>
						<UserCircle
							profile={user.profile}
							className="h-24 w-24 mx-auto flex-shrink-0"
							// onClick={() => navigate(`./kudo/${user.id}`)}
						/>
					</Link>
				))}
			</div>
			<div className="text-center p-6 bg-gray-300">
				<form action="/logout" method="post">
					<button
						type="submit"
						className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
					>
						Sign Out
					</button>
				</form>
			</div>
		</div>
	);
}
