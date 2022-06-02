import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

const app_id = process.env.APP_ID;
const server_url = process.env.SERVER_URL;

function MyApp({ Component, pageProps }) {
	console.log(app_id, server_url);
	return (
		<MoralisProvider appId={app_id} serverUrl={server_url}>
			<Component {...pageProps} />
		</MoralisProvider>
	);
}

export default MyApp;
