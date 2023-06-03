import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-black h-screen overflow-hidden"}>
        <Sidebar />
      </main>
    </div>
  );
}
