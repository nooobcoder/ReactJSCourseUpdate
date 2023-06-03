import { useMoralis } from "react-moralis";

export default function Home() {
	const { logout } = useMoralis();
	return (
		<p>
			You are logged in
			<button onClick={logout}>Sign Out</button>
		</p>
	);
}
