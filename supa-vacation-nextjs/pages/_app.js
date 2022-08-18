import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider as AuthProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Toaster />
      <AuthProvider session={session}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
