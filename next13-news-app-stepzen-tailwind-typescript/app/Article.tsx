import { tinos, roboto } from "./fonts";
import Image from "next/image";
import ReadMoreButton from "@/app/ReadMoreButton";
import LiveTimestamp from "@/app/LiveTimestamp";

type Props = {
  article: Article;
};

export default function Article({ article }: Props) {
  return (
    <article
      className={`${tinos.variable} ${roboto.variable} flex flex-col rounded-lg bg-slate-100 shadow-2xl transition-all duration-200 ease-out hover:scale-105 hover:bg-slate-200 hover:shadow-lg dark:bg-slate-800`}
    >
      {article.image && (
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/${article.image}`}
          alt={article.title}
          className="h-56 w-full rounded-t-lg object-cover shadow-md"
          width={500}
          height={300}
        />
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col p-5">
          <h2 className="font-sans font-bold">{article.title}</h2>

          <section className="mt-2 flex-1 font-roboto">
            <p className="text-xs line-clamp-3">{article.description}</p>
          </section>

          <footer>
            <p>{article.source}</p>
            <p>
              <LiveTimestamp time={article.published_at} />
            </p>
          </footer>
        </div>

        {/* Read More button */}
        <ReadMoreButton article={article} />
      </div>
    </article>
  );
}
