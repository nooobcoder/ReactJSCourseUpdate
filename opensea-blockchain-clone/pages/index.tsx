import {
  useAddress,
  useCoinbaseWallet,
  useMetamask, useWalletConnect
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { client } from '../lib/sanityClient'

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

const Home: NextPage = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet()
  const connectWithMetamask = useMetamask()
  const connectWithWalletConnect = useWalletConnect()
  const address = useAddress()

  const welcomeUser = (userName: string, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  useEffect(() => {
    if (address) {
      ;(async () => {
        const userDoc = {
          _type: 'users',
          _id: address,
          userName: 'Unnamed',
          walletAddress: address,
        }

        const result = await client.createIfNotExists(userDoc)
        welcomeUser(result.userName)
      })()
    }
  }, [address])

  // If a wallet is connected, show address, chainId and disconnect button
  /* if (address) {
    return (
      <div className={style.walletConnectWrapper}>
        Address: {address}
        <br />
        Chain ID: {network[0].data.chain && network[0].data.chain.id}
        <br />
        <button className={style.button} onClick={disconnectWallet}>
          Disconnect
        </button>
      </div>
    )
  } */

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWithCoinbaseWallet()}
          >
            Connect Coinbase Wallet
          </button>
          <button
            className={style.button}
            onClick={() => connectWithMetamask()}
          >
            Connect MetaMask
          </button>
          <button
            className={style.button}
            onClick={() => connectWithWalletConnect()}
          >
            Connect WalletConnect
          </button>
          <div className={style.details}>
            You need Chrome to be
            <br /> able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
