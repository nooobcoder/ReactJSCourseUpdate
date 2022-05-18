import type { NextPage } from 'next'
import Head from 'next/head'
import Postbox from '../components/Postbox'

const Home: NextPage = () => {
  return (
    // Tailwind space around
    <div className="">
      <Head>
        <title>Reddit 2.0 - nooobcoder</title>
      </Head>
      <Postbox />
      {/* Feed */}
    </div>
  )
}

export default Home
