import '../styles/globals.css'

import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import appStore from '../redux/slices'

const AmazonApp:React.FC<AppProps> = ({ Component, pageProps }: AppProps) =>(
  <Provider store={ appStore}><Component {...pageProps} /></Provider>
)
export default AmazonApp
