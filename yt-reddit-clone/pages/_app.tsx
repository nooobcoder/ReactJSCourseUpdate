import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { client } from "../apollo-client";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // Remove all console.logs in production
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.info = () => {};
  }

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Toaster />
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
