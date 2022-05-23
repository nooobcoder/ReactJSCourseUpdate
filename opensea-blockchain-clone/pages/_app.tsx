import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@3rdweb/react'

function MyApp({ Component, pageProps }: any) {
  const supportedChainIds = [80001]
  const connectors = {
    injected: {},
    walletconnect: {},
    walletlink: {
      appName: 'thirdweb - demo',
      url: 'https://thirdweb.com',
      darkMode: false,
    },
  }

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
