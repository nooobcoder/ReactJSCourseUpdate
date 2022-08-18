import { ServerRouter } from '@/server/router';
import '@/styles/global.css';
import { AppType } from 'next/dist/shared/lib/utils';
import { withTRPC } from '@trpc/next';

const App: AppType = ({ Component, pageProps }) => <Component {...pageProps} />;

export default withTRPC<ServerRouter>({
  config({ ctx }: any) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : `http://localhost:4848/api/trpc`;

    return { url };
  },
  ssr: true,
})(App);
