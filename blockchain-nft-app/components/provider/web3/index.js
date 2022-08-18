const { createContext,  useContext } = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState, useMemo } from "react";
import { loadContract } from "@utils/loadContract";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const Web3Context = createContext(null);

export default function Web3Provider({children}) {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        marketContract: null,
        // nftContract: null,
        isLoading: true,
        hooks: setupHooks(),
    })

    useEffect(() => {
        const loadProvider = async () => {
            
            const provider = await detectEthereumProvider()
            if (provider) {
                const web3 = new Web3(provider)
                // const marketContract = await loadContract("MemeMarketplace", web3)
                // const nftContract = await loadContract("NFT", web3)
                const marketContract = await loadContract("MemeMarketplaceV2", web3)
                // console.log(nftContract)
                setWeb3Api({
                    provider,
                    web3,
                    marketContract,
                    // nftContract,
                    isLoading: false,
                    hooks: setupHooks(web3, provider)
                })
            } else {
                setWeb3Api( api => ({...api, isLoading: false}))
                console.error("Please, install Metamask.")
            }
        }

        loadProvider()
    }, [])

    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api
        return {
            ...web3Api,
            // isWeb3Loaded: web3 != null,
            requireInstall: !isLoading && !web3,
            connect: provider ?
             async () => { 
                console.log("come here")
                try {
                    await provider.request({method: "eth_requestAccounts"})
                } catch {
                    console.error("cannot retreive account!")
                    location.reload()
                }          
            } :
            () => console.error("Cannot connect to Metamask, try to reload your browser please"),
        }
    }, [web3Api])

    return (
    <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context)
}

export function useHooks(cb) {
    const { hooks } = useWeb3()
    return cb(hooks)
}