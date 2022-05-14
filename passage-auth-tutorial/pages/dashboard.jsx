import Passage from "@passageidentity/passage-node";
import Link from "next/link";
import styles from "../styles/App.module.css";

export default function Dashboard({ isAuthorized, username }) {
	console.log(isAuthorized, username);
	const authorizedBody = (
		<>
			You successfully signed in with Passage.
			<br />
			<br />
			Your username is: <b>{username}</b>
		</>
	);

	const unauthorizedBody = (
		<>
			You have not logged in and cannot view the dashboard.
			<br />
			<br />
			<Link href="/" className={styles.link}>
				Login to continue.
			</Link>
		</>
	);

	return (
		<div className={styles.dashboard}>
			<div className={styles.title}>
				{isAuthorized ? `Welcome, ${username}` : "Not Authorized"}
			</div>
			<div className={styles.message}>
				{isAuthorized ? authorizedBody : unauthorizedBody}
			</div>
		</div>
	);
}

// Prepare JSDOC for getServerSideProps
/**
 * @typedef {Object} Props
 * @property {boolean} isAuthorized
 * @property {string} username
 * @property {string} appId
 * @property {string} apiKey
 * @property {string} authToken
 * @property {string} userId
 * @property {string} email
 * @property {string} phone
 */
export async function getServerSideProps(ctx) {
	// getServerSideProps runs server-side only and will never execute on the client browser
	// this allows the safe use of a private Passage API Key
	const passage = new Passage({
		appID: process.env.PASSAGE_APP_ID,
		apiKey: process.env.PASSAGE_API_KEY,
		authStrategy: "HEADER",
	});

	try {
		// Get cookies from context
		const authToken = ctx.req.cookies["psg_auth_token"];
		const req = {
			headers: { authorization: `Bearer ${authToken}` },
		};
		const userId = await passage.authenticateRequest(req);
		if (userId) {
			// The user is authenticated
			const { email, phone } = await passage.user.get(userId);

			// User email if not null, otherwise phone
			const identifier = email || phone;
			return { props: { isAuthorized: true, username: identifier } };
		}
	} catch (error) {
		// Authentication Failed
		return { props: { isAuthorized: false, username: "" } };
	}
}
