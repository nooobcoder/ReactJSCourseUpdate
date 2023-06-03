import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps }: AppProps) => (
	<SessionProvider session={pageProps.session}>
		<Component {...pageProps} key="app-root" />
	</SessionProvider>
);

export default App;
