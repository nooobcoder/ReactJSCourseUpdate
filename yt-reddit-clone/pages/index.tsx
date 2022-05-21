import type { NextPage } from 'next'
import Head from 'next/head'
import Postbox from '../components/Postbox'

const Home: NextPage = () => {
  return (
    // Tailwind space around
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0 - nooobcoder</title>
      </Head>
      <Postbox />
      {/* Feed */}
    </div>
  )
}

export default Home
