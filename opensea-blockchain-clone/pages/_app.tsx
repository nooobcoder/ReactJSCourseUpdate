import { ThirdwebProvider } from '@thirdweb-dev/react'

import '../styles/globals.css'

/*
 * The chain ID 4 represens the Rinkeby testnet.
 * The `injected` connecter is a web3 connection method used by Metamask.
 */
function MyApp({ Component, pageProps }: any) {
  const desiredChainId = 4

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
