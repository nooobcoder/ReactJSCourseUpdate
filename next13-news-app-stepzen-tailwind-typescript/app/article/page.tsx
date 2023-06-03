import { roboto, tinos } from "@/app/fonts";
import LiveTimestamp from "@/app/LiveTimestamp";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  searchParams?: Article;
};

// `yarn build` could not got searchParams as undefined, but `yarn dev` ran fine.
// Below line is a temporary fix to make `yarn build` work.
// ?WARN: This is a temporary fix. See -> https://github.com/vercel/next.js/issues/43077
export const dynamic = "force-dynamic";

function ArticlePage({ searchParams }: Props) {
  if (
    !searchParams ||
    (searchParams && Object.entries(searchParams).length === 0)
  )
    return notFound();

  const article: Article = searchParams;

  return (
    <article className={`${tinos.variable} ${roboto.variable} dark:text-black`}>
      <section className="flex flex-col px-0 pb-24 lg:flex-row lg:px-10">
        {article.image && (
          <Image
            src={`https://res.cloudinary.com/demo/image/fetch/${article.image}`}
            alt={article.title}
            className="h-30 float-left mx-auto my-8 max-w-md rounded-lg object-cover shadow-md md:max-w-lg lg:max-w-xl"
            width={400}
            height={200}
          />
        )}

        <div className="space-y-3 divide-y-2 divide-black px-10">
          <h1 className="headerTitle px-0 pb-2 no-underline">
            {article.title}
          </h1>

          <div className="flex transform justify-around space-x-5 divide-x-2 rounded-full bg-purple-300 py-3 text-center opacity-70 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer hover:opacity-100 lg:p-3 lg:text-sm">
            <h2 className="font-bold">By: {article.author}</h2>
            <h2 className="pl-4 font-bold">Source: {article.source}</h2>
            <p className="pl-4">
              Published at: <LiveTimestamp time={article.published_at} />(
              {article.published_at})
            </p>
          </div>

          <p className="pt-4">{article.description}</p>
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;
