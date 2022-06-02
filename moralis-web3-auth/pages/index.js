import { useMoralis } from "react-moralis";
import Login from "../components/Login";
import Logout from "../components/Logout";

export default function Home() {
	const { isAuthenticated } = useMoralis();

	return (
		<div>
			{isAuthenticated ? (
				<p>
					You are logged in. <Logout />
				</p>
			) : (
				<Login />
			)}
		</div>
	);
}
